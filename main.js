document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = `<del>Closed</del>`;
  // currentIssue.color = '#FFC107';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  location.reload();
}
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log('fetchIssues',issues);
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  for (let i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    numberOfIssue();
  }

}

const numberOfIssue = () => {
  document.getElementById('number-of-issues').innerText = document.getElementById("issuesList").childElementCount;
  let issueStatus = document.getElementsByClassName("label-info");
  if (issueStatus.length > 0) {
    let notSolved = 0;
    let closed = 0;

    for (let i = 0; i < issueStatus.length; i++) {
      const element = issueStatus[i].innerText;
      if (element == "Open") {
        notSolved = notSolved + 1;
      } else if (element == "Closed") {
        closed = closed + 1;
      }
    }

    document.getElementById("not-solved").innerText = notSolved;
    document.getElementById("closed").innerText = closed;
  }
}
