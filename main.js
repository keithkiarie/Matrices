document.getElementById("options").addEventListener("change", mode);

function mode() {
    switch (document.getElementById("options").value) {
        case "determinant":
            determinant();
            break;

        case "eigen":
            alert('Eigen still under development!');
            break;
        default:
            alert("Not yet available");
            break;
    }
}

function CreateMatrixTable() {
    //can't be blank
    if (document.getElementById("dimension_a").value == 0 || document.getElementById("dimension_a").value == '') {
        document.getElementById("dimension_a").value = 1;
    }

    if (document.getElementById("dimension_b").value == 0 || document.getElementById("dimension_a").value == '') {
        document.getElementById("dimension_b").value = 1;
    }

    let a = parseInt(document.getElementById("dimension_a").value);
    let b = parseInt(document.getElementById("dimension_b").value);
    let matrix_body = "";
    let i = 1;

    for (let row = 0; row < a; row++) {
        //columns
        matrix_body += "<br>";

        for (let column = 0; column < b; column++) {
            //rows
            matrix_body += `<input type='number' id='td${i}' style='width:5%' value='0'>`
            i++;
        }
    }

    document.getElementById("matrix_body").innerHTML = matrix_body;
};
CreateMatrixTable();

let Arr = [[7, 5, 2], [6, 4, 7], [3, 1, 6]];
let Arr1 = [[4, 7], [1, 6]];
let Arr2 = [[5, 2], [1, 6]];
let Arr3 = [[5, 2], [4, 7]];

//alert(GetDeterminant(Arr));