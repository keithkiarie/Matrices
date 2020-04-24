function GetDeterminant(Matrix) {
    if (Matrix.length == 2) {
        return ((Matrix[0][0] * Matrix[1][1]) - (Matrix[0][1] * Matrix[1][0]));
    }

    let SubMatrices = [];

    for (let i = 0; i < Matrix.length; i++) {
        SubMatrices.push([Matrix[i][0], CreateSubMatrix(0, i, Matrix)]);
    }

    let Operation = "+";
    let Determinant = 0;

    SubMatrices.forEach(SubMatrix => {
        if (Operation == "+") {
            Determinant += (SubMatrix[0] * GetDeterminant(SubMatrix[1]));
            Operation = "-";
        } else {
            Determinant -= (SubMatrix[0] * GetDeterminant(SubMatrix[1]));
            Operation = "+";
        }
    });

    return Determinant;
}

function CreateSubMatrix(row, col, Matrix) {
    let SubMatrix = [];
    Matrix.forEach(item => {
        SubMatrix.push(item.slice());
    });

    SubMatrix.splice(col, 1); //remove a column

    for (let i = 0; i < SubMatrix.length; i++) {
        SubMatrix[i].splice(row, 1); //remove items in a row
    }

    return SubMatrix;
}