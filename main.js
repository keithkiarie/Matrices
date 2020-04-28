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
    let i = 0;

    for (let row = 0; row < a; row++) {
        //columns
        matrix_body += "<br>";

        for (let column = 0; column < b; column++) {
            //rows
            matrix_body += `<input type='number' id='td${i}' style='width:5%' value='0' onchange='InputChange()'
            oninput='InputChange()'>`;
            i++;
        }
    }

    document.getElementById("matrix_body").innerHTML = matrix_body;
};
CreateMatrixTable();

//get data from DOM and make a multidimensional array
function ProduceMatrix() {

    let DimensionA = document.getElementById('dimension_a').value;
    let DimensionB = document.getElementById('dimension_b').value;

    if (DimensionA != DimensionB) return [];

    let Matrix = [];
    for (let i = 0; i < DimensionA; i++) {
        Matrix.push([]);
    }

    for (let i = 0; i < DimensionA; i++) {
        for (let j = 0; j < DimensionA; j++) {
            let Value = document.getElementById(`td${(j * DimensionA) + i}`).value;
            if (Value == "") Value = 0;
            Matrix[i].push(parseInt(Value));
        }
    }

    return Matrix;
}

function InputChange() {
    let Matrix = ProduceMatrix();

    document.getElementById("DeterminantDisplay").innerHTML = `<b>Determinant</b>: ${GetDeterminant(Matrix)}`;

    document.getElementById("InverseDisplay").innerHTML = `<b>Matrix</b>: ${MatrixInHTML(GetInverse(Matrix))}`;

}

function MatrixInHTML(Matrix) {

    let DIVBody = "<table><tr>";
    for (let i = 0; i < Matrix.length; i++) {
        for (let j = 0; j < Matrix.length; j++) DIVBody += `<td>${Matrix[j][i]}</td>`;
        DIVBody += "</tr>";
    }
    DIVBody += "</table>";
    return DIVBody;
}