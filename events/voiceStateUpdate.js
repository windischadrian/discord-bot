module.exports = async (oldState, newState) => {
    const date = new Date();
    var exclusions = ['215850233194741760'];
    console.log(newState)
    if(newState.channelId === "698958944122699878" && !exclusions.includes(newState.member.id))
    { 
        await newState.member.createDM();
        await newState.member.send(`Ia te uita, e ora ${date.toLocaleTimeString()}, ora perfecta sa sugi pula.`)
    }

    if(oldState.channelId === "698958944122699878" && !exclusions.includes(newState.member.id))
    { 
        await oldState.member.createDM();
        await oldState.member.send(`Ai plecat sa sugi pula, este?`);
    }

 };