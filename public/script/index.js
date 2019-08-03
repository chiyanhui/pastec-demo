const fileInput = document.querySelector('#fileInput'),
  submitButton = document.querySelector('#submitButton'),
  result = document.querySelector('#result');

submitButton.addEventListener('click', function() {
  if (!fileInput.value) {
    return;
  }
  result.value = '';
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  axios.post('/api/webar/search', formData).then(res => {
    result.value = JSON.stringify(res.data, null, 2);
  });
});
