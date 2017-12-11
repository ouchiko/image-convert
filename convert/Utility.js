class Utility
{
    static getRand(min, max)
    {
        let rand = Math.floor(
            Math.random() * (max - min) + min
        );

        return rand;
    }

    static getRandomString(len)
    {
        let opts = "ABCDEFJHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i=0;i<len;i++) {
            result += opts.charAt(Utility.getRand(0, opts.length));
        }
        return result;
    }
}

module.exports = Utility;
