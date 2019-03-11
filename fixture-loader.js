import { readFileSync } from 'fs';

const Load = (name, type) => {
    const path = `${name}.${type}`;
    console.log(path);
    const file = readFileSync(path, 'utf8');
    return type === 'html' ? file : JSON.parse(file);
};
export default Load;