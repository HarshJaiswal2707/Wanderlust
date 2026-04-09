module.exports = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    };
};

//it is a Higher Order Function (HOF) which help to handle async error
// Ye ek bodyguard hai 
// Tumhara async function = VIP
// Error = attacker
// wrapAsync = bodyguard jo attacker ko pakad ke next() ko de deta hai