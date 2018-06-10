class Operation {
  constructor(edits) {
    this.edits = edits;
  }

  static combine(op1, op2) {
    const combinedEdits = [];

    const op1Edits = JSON.parse(JSON.stringify(op1.edits));
    const op2Edits = JSON.parse(JSON.stringify(op2.edits));

    while (op1Edits.length + op2Edits.length > 0) {
      const nextEdit =
        op1Edits[0] && op2Edits[0]
          ? this._pickNextEdit(op1Edits[0], op2Edits[0])
          : op1Edits[0] || op2Edits[0];

      combinedEdits.push(
        nextEdit === op1Edits[0] ? op1Edits.shift() : op2Edits.shift()
      );
    }

    return new this(combinedEdits);
  }

  combine(op) {
    this.edits = Operation.combine(this, op).edits;
  }

  apply(str) {
    let finalString = "";
    let caretPosition = 0;

    this.edits.forEach(edit => {
      if (edit.move) {
        finalString += str.slice(caretPosition, caretPosition + edit.move);
        caretPosition += edit.move
      } else if (edit.insert) {
        finalString += edit.insert;
      } else if (edit.delete) {
        caretPosition += edit.delete;
      }
    });

    if (caretPosition < str.length) {
      finalString += str.slice(caretPosition);
    }

    return finalString;
  }

  static _pickNextEdit(edit1, edit2) {
    if (edit1.move && edit2.move) {
      if (edit1.move <= edit2.move) {
        edit2.move -= edit1.move;

        return edit1;
      } else {
        edit1.move -= edit2.move;

        return edit2;
      }
    }

    if (edit1.insert && edit2.insert) {
      return edit1;
    }

    if (edit1.delete && edit2.delete) {
      if (edit1.delete <= edit2.delete) {
        edit2.delete -= edit1.delete;

        return edit1;
      } else {
        edit1.delete -= edit2.delete;

        return edit2;
      }
    }

    if (edit2.move) {
      if (edit1.delete) edit2.move -= edit1.delete;
      return edit1;
    }

    if (edit1.move) {
      if (edit2.delete) edit1.move -= edit2.delete;
      return edit2;
    }

    return edit1.insert ? edit1 : edit2;
  }
}

module.exports = Operation;
