/* eslint-env jquery, browser */

const baseUrl = 'http://localhost:9000';

$(document).ready(() => {

  // Place JavaScript code here...
});


function deleteCourse(id, csrf) {
  let data = {
    "_csrf": csrf
  };
console.log(data)
console.log(csrf)
  fetch(`${baseUrl}/courses/${id}`, {
    method: 'delete',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: data
  })
    .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      window.reload();
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

function countWords() {
  let description = $('#description');
  let val = description.val();
  let length = val.trim().length;
  if (length != 250) $('#wordCount').text(`${250 - length} words remaining`);
  else document.getElementById('description').disabled = true;

}
