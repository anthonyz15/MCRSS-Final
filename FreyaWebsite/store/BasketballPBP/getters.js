
// TODO -> Update these getter methods based on the new state.js.
export default {
    currentSet: state => state.currentSet,
    // UPRM Sets Score.
    uprmSets: state => state.uprmSets,
    // Opponent Team Current Score.
    oppSets: state => state.oppSets,
    uprmRoster: state => state.uprmRoster,
    oppRoster: state => state.oppRoster,
    gameOver: state => state.gameOver,
    oppColor: state => state.oppColor,
    gameActions: state => state.gameActions,
    
    currentUPRMSet: state => {
        if (state.currentSet === 0) {
            return 0;
        } else {
            return state.uprmSets;
        }
    },
    
    currentOppSet: state => {
        if (state.currentSet === 0) {
            return 0;
        }
        return state.oppSets;
    },
    uprmScore: (state) => {
        if (state.currentSet <= 1) {
            return 0;
        }
        else {
            let score = 0;
            let bound = state.currentSet;
            if (state.gameOver === true) {
                bound++;
            }
            for (let i = 1; i < bound; i++) {
                if (state.uprmSets[i - 1] > state.oppSets[i - 1]) {
                    score++;
                }
            }
            return score;
        }
    },
    oppScore: (state) => {
        if (state.currentSet <= 1) {
            return 0;
        }
        else {
            let score = 0;
            let bound = state.currentSet;
            if (state.gameOver === true) {
                bound++;
            }
            for (let i = 1; i < bound; i++) {
                if (state.oppSets[i - 1] > state.uprmSets[i - 1]) {
                    score++;
                }
            }
            return score;
        }
    },
    uprmStatistics: (state) => {
        let temp=state.uprmStatistics;
        let ftpercentage=0;
        ftpercentage=state.uprmStatistics.freethrow/state.uprmStatistics.freethrowAttempt*100;
        ftpercentage=parseFloat(ftpercentage).toFixed(1);
        if(!isNaN(ftpercentage)){
        temp["freethrowPercentage"]=ftpercentage;
        }
        else{
            temp["freethrowPercentage"]=0;
        }
        let tppercentage=0;
        tppercentage=state.uprmStatistics.twopoints/state.uprmStatistics.twopointsAttempt*100;
        tppercentage=parseFloat(tppercentage).toFixed(1);
        if(!isNaN(tppercentage)){
            temp["twopointsPercentage"]=tppercentage;
            }
            else{
                temp["twopointsPercentage"]=0;
            }
        let trppercentage=0;
        trppercentage=state.uprmStatistics.threepoints/state.uprmStatistics.threepointsAttempt*100;
        trppercentage=parseFloat(trppercentage).toFixed(1);
        if(!isNaN(trppercentage)){
            temp["threepointsPercentage"]=trppercentage;
            }
            else{
                temp["threepointsPercentage"]=0;
            }
        return temp;
    },
    
    oppStatistics: (state) => {
        let temp=state.oppStatistics;
        let ftpercentage=0;
        ftpercentage=state.oppStatistics.freethrow/state.oppStatistics.freethrowAttempt*100;
        ftpercentage=parseFloat(ftpercentage).toFixed(1);
        if(!isNaN(ftpercentage)){
            temp["freethrowPercentage"]=ftpercentage;
            }
            else{
                temp["freethrowPercentage"]=0;
            }
        let tppercentage=0;
        tppercentage=state.oppStatistics.twopoints/state.oppStatistics.twopointsAttempt*100;
        tppercentage=parseFloat(tppercentage).toFixed(1);
        if(!isNaN(tppercentage)){
            temp["twopointsPercentage"]=tppercentage;
            }
            else{
                temp["twopointsPercentage"]=0;
            }
        let trppercentage=0;
        trppercentage=state.oppStatistics.threepoints/state.oppStatistics.threepointsAttempt*100;
        trppercentage=parseFloat(trppercentage).toFixed(1);
        if(!isNaN(trppercentage)){
            temp["threepointsPercentage"]=trppercentage;
            }
            else{
                temp["threepointsPercentage"]=0;
            }
        return temp;
    },
    uprmAthleteStatistics: state => state.uprmAthleteStatistics,
    oppAthleteStatistics: state => state.oppAthleteStatistics,
    sportName: state => state.sportName,
    hasPBP: state => state.hasPBP,
    teamId: state => state.teamId,
    validUPRMRoster: state => state.validUPRMRoster,
    branch: state => state.branch,
    opponentName: state => state.opponentName,
}