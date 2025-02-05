function convertData() {
    const inputData = $("#InputData").val().trim();
    const inputColumn = $("#InputColumn").val().trim();
    const selectedOption = $('input[name="options"]:checked').val();
    const selectedCommand = $('input[name="selectCommand"]:checked').val();
    const selectedTypeInsert = $('input[name="TypeInsert"]:checked').val();
    let TextCommand = "";


    if (selectedCommand === 'InsertData') {
        $("#SelectTypeInsert").show();
        if (selectedTypeInsert === 'InsertManual') {
            $("#InsertColumn").show();
        }
        else {
            $("#InsertColumn").hide();
        }
    } else {
        $("#SelectTypeInsert").hide();
        $("#InsertColumn").hide();
        $("#InputColumn").val("");
        $("input[name='TypeInsert'][value='InsertAll']").prop("checked", true);
    }

    switch (selectedCommand) {
        case 'SelectAll':
            TextCommand = "SELECT * FROM tbname WHERE columnname IN ";
            break;
        case 'UpdateAll':
            TextCommand = "UPDATE tbname SET columnname = '0' WHERE columnname IN ";
            break;
        case 'InsertData':
            if (selectedTypeInsert === 'InsertAll') {
                TextCommand = "INSERT INTO tbname VALUES";
            } else if (selectedTypeInsert === 'InsertManual') {
                TextCommand = "INSERT INTO tbname";
            }
            break;
        case 'DeleteData':
            TextCommand = "DELETE FROM tbname WHERE columnname IN ";
            break;
        default:
            TextCommand = "";
            break;
    }

    if (selectedOption === "GEN2QS" && inputData) {
        const lines = inputData.split(/[\n,]+/).filter(f => f.trim() !== ''); 
        const linesColumn = inputColumn.split(/[\n,]+/).filter(f => f.trim() !== '');
        let outputData = TextCommand + `('${lines.join("','")}')`;
        if (selectedCommand === 'InsertData' && selectedTypeInsert === 'InsertManual') {
            outputData = TextCommand + `('${linesColumn.join("','")}') VALUES` + `('${lines.join("','")}')`;
        }

        $("#OutputData").val(outputData);
    }
    // else if (selectedOption === "GEN2QM" && inputData) {
    //     const lines = inputData.split("\n");
    //     const outputData = " " + `('${lines.join("','")}')`;
    //     $("#OutputData").val(outputData);
    // }
    // else if (selectedOption === "GEN2QL" && inputData) {
    //     const lines = inputData.split("\n");
    //     const outputData = `('${lines.join("'),('")}')`;
    //     $("#OutputData").val(outputData);
    // }
    // else if (selectedOption === "Update" && inputData) {
    //     const lines = inputData.split("\n");
    //     const outputData = TextCommand + `('${lines.join("','")}')`;
    //     $("#OutputData").val(outputData);
    // }
    else {
        $("#OutputData").val("Please Input Data");
    }
}

function clear_data() {
    $("#InputData").val("");
    $("#OutputData").val("");
    $("#InputColumn").val("");
    Swal.fire({
        title: 'Success!',
        text: 'Clear success!',
        icon: 'success',
        timer: 1500,
        confirmButtonText: 'OK'
    });
}

function copy_data() {
    const textArea = $("#OutputData");
    const tempElement = $("<textarea></textarea>").val(textArea.val());
    const customConfirmButton = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-success"
        },
        buttonsStyling: true
    });

    $("body").append(tempElement);
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

    navigator.clipboard.writeText(tempElement.val()).then(() => {
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
    }).finally(() => {
        tempElement.remove();
    });
}
