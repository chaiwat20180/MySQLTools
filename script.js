function convertData() {
    const inputData = $("#InputData").val().trim();
    const inputColumn = $("#InputColumn").val().trim();
    const selectedOption = $('input[name="options"]:checked').val();
    const selectedCommand = $('input[name="selectCommand"]:checked').val();
    const selectedTypeInsert = $('input[name="TypeInsert"]:checked').val();
    const selectedTypeData = $('input[name="selectTypeData"]:checked').val();
    const selectedOther = $('input[name="selectOther"]:checked').val();
    const selectTextStyle = $('input[name="selectTextStyle"]:checked').val();
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
        let lines ;
        let linesColumn = inputColumn.split(/[\n,]+/).filter(f => f.trim() !== '');
        switch(selectedTypeData){
            case 'Enter' :
                 lines = inputData.split(/[\n]+/).filter(f => f.trim() !== ''); 
                break;
            case 'Comma' :
                 lines = inputData.split(/[\n,]+/).filter(f => f.trim() !== ''); 
                break;
        }
        
        let outputData = TextCommand + `('${lines.join("','")}')`;
        if (selectedCommand === 'InsertData' && selectedTypeInsert === 'InsertManual') {
            outputData = TextCommand + `('${linesColumn.join("','")}') VALUES` + `('${lines.join("','")}')`;
        }
        if(selectedOther === 'DeleteSinglequoteAndParentheses'){
            outputData = outputData.replace(/['"()]/g, "");
        }
        if(selectTextStyle === 'LowerTextStyle'){
            outputData = outputData.toLowerCase();
        }
        if(selectTextStyle === 'UpperTextStyle'){
            outputData = outputData.toUpperCase();
        }
        if(selectTextStyle === 'CapitalizeTextStyle'){
            outputData = outputData.replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
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
    $("#OutputData").val("Please input data");
    $("#InputColumn").val("");
    const TextClear = $("#clear");
    TextClear.html("<span class='tick' id='tickClear'>✔️</span> Cleared!");
    const tick = $("#tickClear");
    tick.removeClass("show");
    setTimeout(() => {
        tick.addClass("show"); 
    }, 0);
    setTimeout(() => {
        TextClear.html("🗑️ Clear");
    }, 1500);
    console.log("Clear Success!");
}

function copy_data(){
    const textArea = $("#OutputData");
    const tempElement = $("<textarea></textarea>").val(textArea.val());
    
    //get text copy
    const TextCopy = $("#copy");

    //show-off tick
    TextCopy.html("<span class='tick' id='tickCopy'>✔️</span> Copied!");
    const tick = $("#tickCopy");
    tick.removeClass("show");
    setTimeout(() => {
        tick.addClass("show"); 
    }, 0);

    

    $("body").append(tempElement);
    tempElement.select();
    navigator.clipboard.writeText(tempElement.val()).then(() => {
        console.log("Success");
    }).catch(err => {
        console.log("Fail");
    }).finally(()=> {
        tempElement.remove();
        setTimeout(() => {
            TextCopy.html("📋 Copy");
        }, 1500);
    });
}
