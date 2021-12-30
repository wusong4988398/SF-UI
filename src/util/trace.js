import _long from '../util/long'
function Trace() {
    this.seedUniquifier = 8682522807148012;
    this.multiplier = 0x5DEECE66D;
    this.addend = 0xB; //
    // 下面算法得到65535,java里是1L<<48 得到281474976710655
    // this.mask = (1 << 48) - 1;
    this.mask = 281474976710655;
    this.seed = 0;
    this.step = 1; // this.seed = (this.seedUniquifier ^ this.multiplier) & this.mask;

    this.fseedUniquifier = function () {
        var next = this.seedUniquifier * 181783497276652981;
        this.seedUniquifier = next;
        return next;
    };

    this.initialScramble = function (seed) {
        return (seed ^ this.multiplier) & this.mask;
    };

    this.nextLong = function () {
        var date = new Date();
        var time1 = date.getTime();
        this.seed = this.initialScramble(this.fseedUniquifier() ^ time1 + Math.round(Math.random() * 100)); // console.log("seed:"+this.seed);
        // var v1 = (this.next(32) << 32);
        // var val = v1 + this.next(32);
        // return val;

        var longVal = new _long('0x' + this.next(32, false), '0x' + this.next(32, true), true); // console.log(longVal)

        var a = longVal.toString(16);
        return a; // return this.next(32,true)+this.next(32,false);
    };

    this.next = function (bits, high) {
        var oldseed = this.seed;
        var nextseed = oldseed * this.multiplier + this.addend & this.mask; // nextseed = (nextseed * this.multiplier + this.addend) & this.mask;

        this.seed = nextseed; // console.log("nextseed:"+nextseed);

        nextseed = Math.abs(nextseed) + Math.round(Math.random() * 100) + this.step;
        this.step++;

        if (this.step >= 999999) {
            this.step = 1;
        } // console.log(nextseed.toString(16))
        // console.log(nextseed.toString(2))


        var b = nextseed.toString(2); // if (high) {
        //   // while(b.length<31){
        //   //	b="1"+b;
        //   // }
        //   // b="0"+b;
        //   while (b.length < 32) {
        //     b = '0' + b
        //   }
        // } else {
        //   while (b.length < 32) {
        //     // var p =  Math.round(Math.random())+"";
        //     b = '0' + b
        //   }
        //   // console.log("v:"+b)
        // }

        while (b.length < 32) {
            // var p =  Math.round(Math.random())+"";
            b = '0' + b;
        } // console.log(b)


        nextseed = parseInt(b, 2); // nextseed = nextseed& 4294967295
        // console.log(nextseed)
        // console.log(nextseed.toString(16))
        // return nextseed >>> (48 - bits)

        return nextseed.toString(16);
    };

    this.traceId = function () {
        return this.nextLong();
    };
}

function getTraceId() {
    return new Trace().traceId();
}


export default getTraceId;
