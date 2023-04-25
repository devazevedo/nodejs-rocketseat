// Readble Streams / Writable Streams

// process.stdin
//     .pipe(process.stdout)


import { Readable, Writable, Transform, Duplex } from 'node:stream';

// Stream de leitura
class OneToHundredStream extends Readable {
    index = 1;
    
    _read(){
        const i = this.index++;
        
        setTimeout(() => {
            if (i > 100){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 1000);
    }
}

// Stream de escrita
class MultiplyByTenStream extends Writable {
    _write(chunck, encoding, callback){
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

// Stream de transformação
class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback){
        const transformed = Number((chunck.toString())) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
    // .pipe(process.stdout)
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())