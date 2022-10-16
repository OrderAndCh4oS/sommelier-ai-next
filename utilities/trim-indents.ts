const regex = /\s*([\n\r])\s*/gm;

export function trimIndents(strings: TemplateStringsArray, ...values: (string | number)[]) {
    let output = '';
    for (let i = 0; i < values.length; i++) {
        output += strings[i].replace(regex, "$1") + values[i];
    }
    output += strings[values.length].replace(regex, "$1");

    return output.trim();
}
