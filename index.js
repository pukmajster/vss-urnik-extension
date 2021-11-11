
let activeSchoolYear = parseInt(document.querySelector('table tr td[align] b').innerText.split(" ")[1]);
let subjectData = [];

function collectSubjectTableData2() {
    let idElems = document.querySelectorAll('body table:nth-of-type(2) tbody tr td:nth-of-type(1) font');
    let dateElems = document.querySelectorAll('body table:nth-of-type(2) tbody tr td:nth-of-type(7) font');

    if(!idElems) return;
    if(!dateElems) return;

    for(let i = 1; i < idElems.length; i++) {
        let id = idElems[i].innerText;

        let [startDateText,, endDateText] = dateElems[i].innerText.split(' ');

        subjectData.push({
            id: id,
            startDate: fixDate(startDateText),
            endDate: fixDate(endDateText)
        });
    }

    applyActivityAttributes();
}

function applyActivityAttributes() {
    let subjectsElems =  document.querySelectorAll('body table:nth-of-type(1) tr td table tbody');
    const currentDate = new Date();

     Array.from(subjectsElems).forEach(subjectElem => {
         if(subjectElem.children.length > 3) {
             let elemText = subjectElem.innerText.split('\n');
             let testId = elemText[elemText.length-1];

             const targetSubject = subjectData.find(_test => _test.id == testId);
             if(targetSubject) {
                 let status = 'inactive';
                 if(Date.parse(targetSubject.startDate) < currentDate && currentDate < Date.parse(targetSubject.endDate) )
                     status = 'active';

                 subjectElem.parentElement.parentElement.classList.add(status);
             }
         }
     })

}

function fixDate(dateText) {
    let month = parseInt(dateText.split('.')[1]);
    let splitMonth = dateText.split('.');

    if(month > 8)
        return `${splitMonth[1]}/${splitMonth[0]}/${activeSchoolYear-1}`;
    return `${splitMonth[1]}/${splitMonth[0]}/${activeSchoolYear}`;
}

collectSubjectTableData2()