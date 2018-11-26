let accessRights=[];

let levelTypes=['all','directions','departments','self'];
let levels={};
levels.all=['all'];
levels.departments=['CR/OFE','CR/PMO','CR/DBE','CR/PJ-IMG','CR/CTG'];
levels.directions=['P','C'];
levels.self=['self'];
const columns=['Admin','Topics','Meetings','Minutes','Tasks'];

generateRights();
console.log(accessRights);
buildRightsTable(accessRights);

function buildRightsTable(right){
    let $table=$('#access-rights-table');
    $headrow=$(document.createElement('tr'));
    $headrow.append('<th>Name</th>');
    for(let column of columns){
        $headrow.append('<th>'+column+'</th>');
    }
    $table.append($headrow);
    for(let right of accessRights){
        let $row=$(document.createElement('tr'));
        $table.append($row);
        $row.append('<td>'+right.name+'</td>');
        for(let column of columns){
            let rightEntries=right.rights[column];
            let levelCount=0;
            if(column=='Admin'){
                if(right.rights[column]) levelCount++;
            }else{
                for(let level in rightEntries){
                    let one=false;
                    for(label in rightEntries[level]){
                        if(rightEntries[level][label]) one=true;
                    }
                    if(one) levelCount++;
                }
            }
            let $td=$(document.createElement('td'));
            $row.append($td);
            $td.append(getRightsIcon(levelCount,(column=='Admin'?1:4)));
        }
        $table.append($row);
    }
    
}

function getRightsIcon(level,limit){
    let $outer=$(document.createElement('div'));
    $outer.addClass('rights-icon-outer');
    let $inner=$(document.createElement('div'));
    $inner.addClass('rights-icon');
    for(let i=limit-1;i>=0;i--){
        $inner.append('<div class="rights-icon-segment rights-icon-segment-'+(limit-1-i)+''+(level>i?' enabled':'')+'"></div>');
    }

    $outer.append($inner);
    return $outer;
}

function generateRights(){
    const names=['Fabian Maurer','Berenike Konz','Stefan Maier','Marlene Monschaw','Minh-Tam Ngo','Christina Bauer','Dheepan Raju','Dimitri Minich','Tobias Grott'];
    for(let name of names){
        let entry={name:name,rights:{}};
        for(let column of columns){
            let yup=false;
            if(column=='Admin') entry.rights[column]=boolRand();
            else{
                entry.rights[column]={};
                for(let level of levelTypes){
                    entry.rights[column][level]={};
                    for(let checkbox of levels[level]){
                        yup=yup||boolRand();
                        entry.rights[column][level][checkbox]=yup;
                    }
                }
            }
        }
        accessRights.push(entry);
    }
}

function boolRand(){
    return Math.random()<0.15;
}