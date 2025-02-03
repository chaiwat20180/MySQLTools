

function convertData() {
    const inputData = document.getElementById("InputData").value.trim();
    const selectedOption = document.querySelector('input[name="options"]:checked').value;
    const selectedCommand = document.querySelector('input[name="selectCommand"]:checked').value;
    let TextCommand = "";

    if(selectedCommand == 'SelectAll'){
        TextCommand = "SELECT * FROM tbname WHERE columnname IN "
    } 
    if(selectedCommand == 'UpdateAll'){
        TextCommand = "UPDATE columnname  SET columnname = '0' WHERE columnname IN "
    }

    if (selectedOption === "GEN2QS" && inputData) {
      const lines = inputData.split("\n");
      const outputData = TextCommand + `('${lines.join("','")}')`;
      document.getElementById("OutputData").value = outputData;
    } 
    else  if (selectedOption === "GEN2QM" && inputData) {
      const lines = inputData.split("\n");
      const outputData = " " + `('${lines.join("','")}')`;
      document.getElementById("OutputData").value = outputData;
    }

    else  if (selectedOption === "GEN2QL" && inputData) {
      const lines = inputData.split("\n");
      const outputData = `('${lines.join("'),('")}')`;
      document.getElementById("OutputData").value = outputData;
    
    } 
    
    else  if (selectedOption === "Update" && inputData) {
        const lines = inputData.split("\n");
        const outputData = TextCommand + `('${lines.join("','")}')`;
        document.getElementById("OutputData").value = outputData;

    }

    else {
      document.getElementById("OutputData").value = "Error";
    }
  }



function clear_data(){
    document.getElementById("InputData").value="";
    document.getElementById("OutputData").value="";
    Swal.fire({
      title: 'Success!',
      text: 'Clear success!',
      icon: 'success',
      timer: 1500,
      confirmButtonText: 'OK'
    });
}


function copy_data() {
  const textArea = document.getElementById("OutputData");
  const tempElement = document.createElement("textarea");
  const customConfirmButton = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success"
    },
    buttonsStyling: true
  });

  tempElement.value = textArea.value;
  document.body.appendChild(tempElement);
  tempElement.select();

  customConfirmButton.fire({
      title: 'กำลังดำเนินการ...',
      text: 'กรุณารอสักครู่',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
          customConfirmButton.showLoading();
      }
  });

  navigator.clipboard.writeText(tempElement.value).then(() => {
    customConfirmButton.showLoading();
    Swal.fire({
      title: 'Success!',
      text: 'Copy success!',
      icon: 'success',
      timer: 1500,
      confirmButtonText: 'OK'
    });
  }).catch(err => {
    //debug
    console.error("Failed to copy:", err); 
    Swal.fire({
      title: 'Error!',
      text: 'Copy Failed. Please try again or CTRL+F5 and try again.',
      icon: 'error',
      timer: 1500,
      confirmButtonText: 'OK'
    });
  });

  // Remove the temporary element (optional for modern browsers)
  document.body.removeChild(tempElement);
}