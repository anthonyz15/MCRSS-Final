import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { encode, TAlgorithm } from "jwt-simple";

// Add axios library for interacting with Odin API via HTTP.	
const axios: any = require('axios').default;

/*
    This file contains the Cloud Functions required for the development of Huella Deportiva Web.
    @author Pedro Luis Rivera Gomez - pedrorivera40
*/

// Initialize app to use Admin Priviledges.	
admin.initializeApp(functions.config().firebase);

// This function is written for learning purposes.
// Its goal is to react to changes in a path of the Realtime Database, to simulate
// rejecting the change (if a new value is present, replace it by the old value).
// In this case that is performed over the game_ended child inside the metadata
// corresponding to a game. For details, refer to the NoSQL structure in the progress
// report #1 for MJOLNIR.

// Prototype...
// export const sampleCloudFunction = functions.database.instance("mjolnir-pbp-v1").ref("/v1/{game_id}/game-metadata/game-ended")	
//     .onUpdate((change, context) => {	
//         // Read the game id for the change. It will be logged for quick testing purposes.	
//         // const gameId = context.params.game_id	
//         // console.log("Change detected on game-id=" + gameId)	

//         // Read the latest data corrsponding to the state.	
//         const gameState = change.after.child("answer").val()	

//         // If the game is not over, ignore/return.	
//         if (gameState === "No") {	
//             // console.log("Game is not over!")	
//             return null	
//         }	

//         // If the game is marked as over, reject that change by re-writting in the database "No".	
//         const answer = "No"	
//         return change.after.ref.update({ answer });	

//     });

// TODO -> Add class documentation.

export class BaseballStatsEntry {

    // Statistics of interest for volleyball.	
    private atbats: number = 0;
    private hits: number = 0;
    private runs: number = 0;
    private runs_batted_in: number = 0;
    private baseonballs: number = 0;
    private strikeouts: number = 0;
    private leftonbase: number = 0;
     

    /**	
     * Empty constructor for a VolleyballStatsEntry instance.	
     */
    // constructor() { }	

    // Instance variables mutator methods.	
    // Used to add actions corresponding to events of a volleyball game that	
    // are considered for statistical purposes.	

   
    // Add a freethrow Attempt play.	
    AtBats(): void {
        this.atbats++;
    }
    // Add a twopoints play.	
    Runs(): void {
        this.runs++;
    }
    // Add a twopoints Attempt play.	
    Hits(): void {
        this.hits++;
    }
     // Add a threepoints play.	
    RunsBattedIn(): void {
        this.runs_batted_in++;
    }
    // Add a Threepoints Attempt play.	
    BaseonBalls(): void {
        this.baseonballs++;
    }
     // Add an assist play.	
    Strikeouts(): void {
        this.strikeouts++;
    }
     // Add an assist play.	
     leftOnBase(): void {
        this.leftonbase++;
    }
 


    // Entry getter method.	
    // This method converts a VolleybalStatEntry into its JSON representation.	
    getJSON(): JSON {
        // Organize output in the following structure:	
        return <JSON><unknown>{
            "baseball_statistics": {
                "at_bats": this.atbats,
                "runs": this.runs,
                "hits": this.hits,
                "runs_batted_in": this.runs_batted_in,
                "base_on_balls": this.baseonballs,
                "strikeouts": this.strikeouts,
                "left_on_base": this.leftonbase
            
            }
        };
    }

}

export const enum BaseballPlays {
    AtBats = "Atbats",
    Runs = "Runs",
    Hits = "Hits",
    Runs_batted_in = "Runs_batted_in",
    Base_on_balls = "BaseOnBalls",
    Strikeouts = "Strikeouts",
    Left_on_base = "LeftOnBase"
    
}

export const updateBaseballStats = function (actionType: string, playerStats:
    BaseballStatsEntry, teamStats: BaseballStatsEntry): void {

    // Update player and team statistics based on the given action type.	
    switch (actionType) {


        case BaseballPlays.AtBats:
            playerStats.AtBats();
            teamStats.AtBats();
            break;

        case BaseballPlays.Runs:
            playerStats.Runs();
            teamStats.Runs();
            break;  
        
        case BaseballPlays.Hits:
            playerStats.Hits();
            teamStats.Hits();
            break;
        
        case BaseballPlays.Runs_batted_in:
            playerStats.RunsBattedIn();
            teamStats.RunsBattedIn();
            break;
        
        case BaseballPlays.Base_on_balls:
            playerStats.BaseonBalls();
            teamStats.BaseonBalls();
            break; 

        case BaseballPlays.Strikeouts:
            playerStats.Strikeouts();
            teamStats.Strikeouts();
            break;  

        case BaseballPlays.Left_on_base:
            playerStats.leftOnBase();
            teamStats.leftOnBase();
            break;
        default:
            console.log("BaseballGameSync Error: Non-statistics current action " + actionType);
            break;
    }

    return;
}

export const postBaseballResults = async function (gameStatistics: JSON) {
    // Prepare for POST request to Odin API with Baseball results.	
    const BaseballPath = "https://white-smile-272204.ue.r.appspot.com/results/baseball/";
    // Handling permissions as required for using Odin API.
    const permissions = [
        { "13": false },
        { "14": false },
        { "15": false },
        { "16": false },
        { "17": false },
        { "18": false },
        { "19": true },
        { "20": false },
        { "21": false },
        { "22": false },
        { "23": false },
        { "24": false },
        { "25": false },
        { "26": false },
        { "27": false }
    ];

    const payload = {
        'permissions': permissions,
    }

    const algorithm: TAlgorithm = "HS256";
    const SECRET_KEY: string = "Ni_El_Corona_Puede_Conmigo";

    let token: string = encode(payload, SECRET_KEY, algorithm);

    // Given the token, send statistics to Odin API.	
    await axios({
        method: 'post',
        url: BaseballPath,
        responseType: 'application/json',
        data: gameStatistics,
        headers: {
            'Authorization': "Bearer " + token
        }
    }).then(function (response: any) {
        console.log(response.data);
        return true;
    }).catch((error: any) => {
        console.log("postBaseballResults posting results error: " + error);
    });

    return false;
}



export class SoccerStatsEntry {

    // Statistics of interest for volleyball.	
    private goals: number = 0;
    private goalAttempts: number = 0;
    private assists: number = 0;
    private tackles: number = 0;
    private cards: number = 0;
    private fouls: number = 0;
     

    /**	
     * Empty constructor for a VolleyballStatsEntry instance.	
     */
    // constructor() { }	

    // Instance variables mutator methods.	
    // Used to add actions corresponding to events of a volleyball game that	
    // are considered for statistical purposes.	

   
    // Add a freethrow Attempt play.	
    GoalsAttempt(): void {
        this.goalAttempts++;
    }
    // Add a twopoints play.	
    Goals(): void {
        this.goals++;
    }
    // Add a twopoints Attempt play.	
    Cards(): void {
        this.cards++;
    }
     // Add a threepoints play.	
    Tackles(): void {
        this.tackles++;
    }
    // Add a Threepoints Attempt play.	
    Fouls(): void {
        this.fouls++;
    }
     // Add an assist play.	
    Assists(): void {
        this.assists++;
    }
 


    // Entry getter method.	
    // This method converts a VolleybalStatEntry into its JSON representation.	
    getJSON(): JSON {
        // Organize output in the following structure:	
        return <JSON><unknown>{
            "soccer_statistics": {
                "successful_goals": this.goals,
                "goal_attempts": this.goalAttempts,
                "assists": this.assists,
                "fouls": this.fouls,
                "tackles": this.tackles,
                "cards": this.cards
            
            }
        };
    }

}

export const enum SoccerPlays {
    Goals = "Goal",
    GoalsAttempt = "GoalAttempt",
    YCard = "YellowCard",
    RCard = "RedCard",
    Tackles = "Tackle",
    Fouls = "Foul",
    Assist = "Assist"
    
}

export const updateSoccerStats = function (actionType: string, playerStats:
    SoccerStatsEntry, teamStats: SoccerStatsEntry): void {

    // Update player and team statistics based on the given action type.	
    switch (actionType) {


        case SoccerPlays.Goals:
            playerStats.Goals();
            teamStats.Goals();
            playerStats.GoalsAttempt();
            teamStats.GoalsAttempt();
            break;

        case SoccerPlays.GoalsAttempt:
            playerStats.GoalsAttempt();
            teamStats.GoalsAttempt();
            break;  
        
        case SoccerPlays.YCard:
            playerStats.Cards();
            teamStats.Cards();
            break;
        
        case SoccerPlays.RCard:
            playerStats.Cards();
            teamStats.Cards();
            break;
        
        case SoccerPlays.Fouls:
            playerStats.Fouls();
            teamStats.Fouls();
            break; 

        case SoccerPlays.Tackles:
            playerStats.Tackles();
            teamStats.Tackles();
            break;  

        case SoccerPlays.Assist:
            playerStats.Assists();
            teamStats.Assists();
            break;
        default:
            console.log("SoccerGameSync Error: Non-statistics current action " + actionType);
            break;
    }

    return;
}

export const postSoccerResults = async function (gameStatistics: JSON) {
    // Prepare for POST request to Odin API with volleyball results.	
    const SoccerPath = "https://white-smile-272204.ue.r.appspot.com/results/soccer/";
    // Handling permissions as required for using Odin API.
    const permissions = [
        { "13": false },
        { "14": false },
        { "15": false },
        { "16": false },
        { "17": false },
        { "18": false },
        { "19": true },
        { "20": false },
        { "21": false },
        { "22": false },
        { "23": false },
        { "24": false },
        { "25": false },
        { "26": false },
        { "27": false }
    ];

    const payload = {
        'permissions': permissions,
    }

    const algorithm: TAlgorithm = "HS256";
    const SECRET_KEY: string = "Ni_El_Corona_Puede_Conmigo";

    let token: string = encode(payload, SECRET_KEY, algorithm);

    // Given the token, send statistics to Odin API.	
    await axios({
        method: 'post',
        url: SoccerPath,
        responseType: 'application/json',
        data: gameStatistics,
        headers: {
            'Authorization': "Bearer " + token
        }
    }).then(function (response: any) {
        console.log(response.data);
        return true;
    }).catch((error: any) => {
        console.log("postSoccerResults posting results error: " + error);
    });

    return false;
}




export class BasketballStatsEntry {

    // Statistics of interest for volleyball.	
    private freethrow: number = 0;
    private freethrowAttempt: number = 0;
    private twopoints: number = 0;
    private twopointsAttempt: number = 0;
    private threepoints: number = 0;
    private threepointsAttempt: number = 0;
    private assists: number = 0;
    private blocks: number = 0;
    private rebounds: number = 0;
    private steals: number = 0;
    private turnovers: number = 0;
    private points: number = 0;
     

    /**	
     * Empty constructor for a VolleyballStatsEntry instance.	
     */
    // constructor() { }	

    // Instance variables mutator methods.	
    // Used to add actions corresponding to events of a volleyball game that	
    // are considered for statistical purposes.	

    // Add a freethrow play.	
    Freethrow(): void {
        this.freethrow++;
    }
    // Add a freethrow Attempt play.	
    FreethrowAttempt(): void {
        this.freethrowAttempt++;
    }
    // Add a twopoints play.	
    Twopoints(): void {
        this.twopoints++;
    }
    // Add a twopoints Attempt play.	
    TwopointsAttempt(): void {
        this.twopointsAttempt++;
    }
     // Add a threepoints play.	
     Threepoints(): void {
        this.threepoints++;
    }
    // Add a Threepoints Attempt play.	
    ThreepointsAttempt(): void {
        this.threepointsAttempt++;
    }
     // Add an assist play.	
     assist(): void {
        this.assists++;
    }
    // Add a block play.	
    block(): void {
        this.blocks++;
    }
    // Add a rebound play.	
    rebound(): void {
        this.rebounds++;
    }
    // Add a steals play.	
    steal(): void {
        this.steals++;
    }
    // Add a turnover play.
    Turnovers(): void {
        this.turnovers++;
    }
    // Add a turnover play.
    Points(add:number): void {
        this.points+=add;
    }


    // Entry getter method.	
    // This method converts a VolleybalStatEntry into its JSON representation.	
    getJSON(): JSON {
        // Organize output in the following structure:	
        return <JSON><unknown>{
            "basketball_statistics": {
                "points": this.points,
                "rebounds": this.rebounds,
                "assists": this.assists,
                "steals": this.steals,
                "turnovers": this.turnovers,
                "blocks": this.blocks,
                "field_goal_attempt": this.twopointsAttempt,
                "successful_field_goal": this.twopoints,
                "three_point_attempt": this.threepointsAttempt,
                "successful_three_point": this.threepoints,
                "free_throw_attempt": this.freethrowAttempt,
                "successful_free_throw": this.freethrow
            }
        };
    }

}

export const enum BasketballPlays {
    Freethrow = "Freethrow",
    FreethrowMiss = "FreethrowMiss",
    Twopoints = "2Points",
    TwopointsMiss = "2PointsMiss",
    Threepoints = "3Points",
    ThreepointsMiss = "3PointsMiss",
    Assist = "Assist",
    Steals = "Steals",
    Block = "Blocks",
    Rebound = "Rebound",
    Turnover = "Turnover",
    ReceptionError = "ReceptionError"
}
// TODO -> Add documentation & TESTS.	
export const updateBasketballStats = function (actionType: string, playerStats:
    BasketballStatsEntry, teamStats: BasketballStatsEntry): void {

    // Update player and team statistics based on the given action type.	
    switch (actionType) {

        case BasketballPlays.Freethrow:
            playerStats.Freethrow();
            teamStats.Freethrow();
            playerStats.FreethrowAttempt();
            teamStats.FreethrowAttempt();
            playerStats.Points(1);
            teamStats.Points(1);
            break;

        case BasketballPlays.FreethrowMiss:
            playerStats.FreethrowAttempt();
            teamStats.FreethrowAttempt();
            break;

        case BasketballPlays.Twopoints:
            playerStats.Twopoints();
            teamStats.Twopoints();
            playerStats.TwopointsAttempt();
            teamStats.TwopointsAttempt();
            playerStats.Points(2);
            teamStats.Points(2);
            break;

        case BasketballPlays.TwopointsMiss:
            playerStats.TwopointsAttempt();
            teamStats.TwopointsAttempt();
            break;  
        
        case BasketballPlays.Threepoints:
            playerStats.Threepoints();
            teamStats.Threepoints();
            playerStats.ThreepointsAttempt();
            teamStats.ThreepointsAttempt();
            playerStats.Points(3);
            teamStats.Points(3);
            break;
        
        case BasketballPlays.ThreepointsMiss:
            playerStats.ThreepointsAttempt();
            teamStats.ThreepointsAttempt();
            break;  

        case BasketballPlays.Assist:
            playerStats.assist();
            teamStats.assist();
            break;

       
        case BasketballPlays.Block:
            playerStats.block();
            teamStats.block();
            break;

        case BasketballPlays.Steals:
            playerStats.steal();
            teamStats.steal();
            break;
        
        case BasketballPlays.Rebound:
            playerStats.rebound();
            teamStats.rebound();
            break;
        
        case BasketballPlays.Turnover:
            playerStats.Turnovers();
            teamStats.Turnovers();
            break;


        default:
            console.log("BasketballGameSync Error: Non-statistics current action " + actionType);
            break;
    }

    return;
}

export const postBasketballResults = async function (gameStatistics: JSON) {
    // Prepare for POST request to Odin API with volleyball results.	
    const BasketballPath = "https://white-smile-272204.ue.r.appspot.com/results/basketball/";
    // Handling permissions as required for using Odin API.
    const permissions = [
        { "13": false },
        { "14": false },
        { "15": false },
        { "16": false },
        { "17": false },
        { "18": false },
        { "19": true },
        { "20": false },
        { "21": false },
        { "22": false },
        { "23": false },
        { "24": false },
        { "25": false },
        { "26": false },
        { "27": false }
    ];

    const payload = {
        'permissions': permissions,
    }

    const algorithm: TAlgorithm = "HS256";
    const SECRET_KEY: string = "Ni_El_Corona_Puede_Conmigo";

    let token: string = encode(payload, SECRET_KEY, algorithm);

    // Given the token, send statistics to Odin API.	
    await axios({
        method: 'post',
        url: BasketballPath,
        responseType: 'application/json',
        data: gameStatistics,
        headers: {
            'Authorization': "Bearer " + token
        }
    }).then(function (response: any) {
        console.log(response.data);
        return true;
    }).catch((error: any) => {
        console.log("postBasketballResults posting results error: " + error);
    });

    return false;
}



export class VolleyballStatsEntry {

    // Statistics of interest for volleyball.	
    private killPoints: number = 0;
    private attackErrors: number = 0;
    private assists: number = 0;
    private aces: number = 0;
    private serviceErrors: number = 0;
    private digs: number = 0;
    private blocks: number = 0;
    private blockPoints: number = 0;
    private blockingErrors: number = 0;
    private receptionErrors: number = 0;

    /**	
     * Empty constructor for a VolleyballStatsEntry instance.	
     */
    // constructor() { }	

    // Instance variables mutator methods.	
    // Used to add actions corresponding to events of a volleyball game that	
    // are considered for statistical purposes.	

    // Add a kill play.	
    kill(): void {
        this.killPoints++;
    }

    // Add an attack error play.	
    attackError(): void {
        this.attackErrors++;
    }

    // Add an assist play.	
    assist(): void {
        this.assists++;
    }

    // Add an ace play.	
    ace(): void {
        this.aces++;
    }

    // Add a service error play.	
    serviceError(): void {
        this.serviceErrors++;
    }

    // Add a dig play.	
    dig(): void {
        this.digs++;
    }

    // Add a block play.	
    block(): void {
        this.blocks++;
    }

    // Add a block point play.
    blockPoint(): void {
        this.blockPoints++;
        this.blocks++;
    }

    // Add a blocking error play.	
    blockingError(): void {
        this.blockingErrors++;
    }

    // Add a reception error play.	
    receptionError(): void {
        this.receptionErrors++;
    }

    // Entry getter method.	
    // This method converts a VolleybalStatEntry into its JSON representation.	
    getJSON(): JSON {
        // Organize output in the following structure:	
        //      { volleyball_statistics : { "stat1" : stat1_val, ... } }	
        return <JSON><unknown>{
            "volleyball_statistics": {
                "kill_points": this.killPoints,
                "attack_errors": this.attackErrors,
                "assists": this.assists,
                "aces": this.aces,
                "service_errors": this.serviceErrors,
                "digs": this.digs,
                "blocks": this.blocks,
                "blocking_points": this.blockPoints,
                "blocking_errors": this.blockingErrors,
                "reception_errors": this.receptionErrors
            }
        };
    }

}

export const enum VolleyballPlays {
    KillPoint = "KillPoint",
    AttackError = "AttackError",
    Assist = "Assist",
    Ace = "Ace",
    ServiceError = "ServiceError",
    Dig = "Dig",
    Block = "Block",
    BlockPoint = "BlockPoint",
    BlockingError = "BlockingError",
    ReceptionError = "ReceptionError"
}

// TODO -> Add documentation & TESTS.	
export const updateVolleyballStats = function (actionType: string, playerStats:
    VolleyballStatsEntry, teamStats: VolleyballStatsEntry): void {

    // Update player and team statistics based on the given action type.	
    switch (actionType) {

        case VolleyballPlays.KillPoint:
            playerStats.kill();
            teamStats.kill();
            break;

        case VolleyballPlays.AttackError:
            playerStats.attackError();
            teamStats.attackError();
            break;

        case VolleyballPlays.Assist:
            playerStats.assist();
            teamStats.assist();
            break;

        case VolleyballPlays.Ace:
            playerStats.ace();
            teamStats.ace();
            break;

        case VolleyballPlays.ServiceError:
            playerStats.serviceError();
            teamStats.serviceError();
            break;

        case VolleyballPlays.Dig:
            playerStats.dig();
            teamStats.dig();
            break;

        case VolleyballPlays.Block:
            playerStats.block();
            teamStats.block();
            break;

        case VolleyballPlays.BlockPoint:
            playerStats.blockPoint();
            teamStats.blockPoint();
            break;

        case VolleyballPlays.BlockingError:
            playerStats.blockingError();
            teamStats.blockingError();
            break;

        case VolleyballPlays.ReceptionError:
            playerStats.receptionError();
            teamStats.receptionError();
            break;

        default:
            console.log("PBPGameSync Error: Non-statistics current action " + actionType);
            break;
    }

    return;
}

export const postVolleyballResults = async function (gameStatistics: JSON) {
    // Prepare for POST request to Odin API with volleyball results.	
    const volleyballPath = "https://white-smile-272204.ue.r.appspot.com/results/volleyball/";
    // Handling permissions as required for using Odin API.
    const permissions = [
        { "13": false },
        { "14": false },
        { "15": false },
        { "16": false },
        { "17": false },
        { "18": false },
        { "19": true },
        { "20": false },
        { "21": false },
        { "22": false },
        { "23": false },
        { "24": false },
        { "25": false },
        { "26": false },
        { "27": false }
    ];

    const payload = {
        'permissions': permissions,
    }

    const algorithm: TAlgorithm = "HS256";
    const SECRET_KEY: string = "Ni_El_Corona_Puede_Conmigo";

    let token: string = encode(payload, SECRET_KEY, algorithm);

    // Given the token, send statistics to Odin API.	
    await axios({
        method: 'post',
        url: volleyballPath,
        responseType: 'application/json',
        data: gameStatistics,
        headers: {
            'Authorization': "Bearer " + token
        }
    }).then(function (response: any) {
        console.log(response.data);
        return true;
    }).catch((error: any) => {
        console.log("postVolleyballResults posting results error: " + error);
    });

    return false;
}

// TODO -> Add cloud function documentation.	
export const PBPGameSync = functions.database.ref("/v1/{game_id}/game-metadata/game-over").onUpdate(async (change, context) =>{ 
        
        /* 	
            <Section 1> 	
                This section represents the first input block from the flowchart	
                in figure F.1 of MJOLNIR's progress report #1. In this part, meta-data,	
                uprm-roster, game actions, and game score is retrieved.	
        */

        // Read the game id (event_id).	
        const gameId = context.params.game_id;
        console.log("Change detected on game-id=" + gameId);

        // Read the latest data corrsponding to the state.
        let gameState: string = "";
        let prevGameState: string = "";

        try {
            gameState = change.after.child("answer").val();
            prevGameState = change.before.child("answer").val();
        } catch (error) {
            console.log("PBPGameSync Error: " + error);
            return null;
        }

        // If the game is not over, ignore/return.	
        if (gameState === "No") {
            // console.log("Game is not over!")	
            return null
        }

        // If the game is not over, ignore/return.
        if (gameState === "No") {
            console.log("PBPGameSync: Game is not over! " + gameState);
            return null;
        }

        if (gameState === prevGameState) {
            console.log("PBPGameSync: Already sync! " + prevGameState);
            return null;
        }

        // Read the sport value.	
        let sport: string = "";

        // Obtain the sport value from game metadata.	
        await admin.database().ref("/v1/" + gameId + "/game-metadata/sport").once('value').then((snapshot) => {
            sport = snapshot.val();
        }).catch(() => {
            console.log("PBPGameSync Errpr: could not retrieve sport from game metadata.");
            return null;
        });


        // Note: Even though for this phase only volleyball is implemented,	
        //       it is important to validate that the sport is volleyball.	
        //       This way, this function can work when other sports are added.	
        if (sport !== "Voleibol" && sport !=="Baloncesto" && sport !=="Futbol" && sport !=="Beisbol") {
            console.log("PBPGameSync Error: Not a volleyball game! (" + sport + ")");
            return null;
        }
        
        if (sport=="Voleibol"){
            // Obtain game score based on sets won by each team.
            let uprmScore: number = 0;
            let opponentScore: number = 0;

            await admin.database().ref("/v1/" + gameId + "/score").once('value').then((snapshot) => {
                // Find the score on each quarter and calculate the number of quarter won by each team.	
                for (let i = 1; i <= 5; i++) {

                    const uprmPoints: number = snapshot.child("set" + i + "-uprm").val();
                    const opponentPoints: number = snapshot.child("set" + i + "-opponent").val();

                    if (uprmPoints > opponentPoints) {
                        uprmScore++;
                    }

                    if (uprmPoints < opponentPoints) {
                        opponentScore++;
                    }
                }
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve score.");
                return null;
            });

            // If the game is marked as over and is a volleyball game, start sync process.	

            /*	
                <Section 2>	
                    This section represents the first process block of the flowchart in which	
                    uprm-player-stats (uprmPlayerStats in code) and uprm-stats (uprmStats) are	
                    initialized. Note that in this implementation, when the game actions are	
                    retrieved, uprmPlayerStats and uprmStats collections are being modified.	
            */

            // Initialize Variables.	
            let uprmPlayerStats: VolleyballStatsEntry[] = [];
            let uprmPlayerKeys: string[] = [];
            let uprmStats: VolleyballStatsEntry = new VolleyballStatsEntry();

            // Retrieve UPRM roster from RTDB.	
            await admin.database().ref("/v1/" + gameId + "/uprm-roster").once('value').then((snapshot) => {
                // Insert athlete VolleyballStatsEntry into the uprmPlayerStats map.	
                snapshot.forEach((athleteSnap) => {
                    const athleteKey: string = <string>athleteSnap.child("athlete_id").val();
                    uprmPlayerKeys.push(athleteKey);
                    uprmPlayerStats.push(new VolleyballStatsEntry());
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve UPRM roster.");
                return null;
            });

            console.log(uprmPlayerStats);

            // Retrieve game actions and per each game action modify uprmPlayerStats and uprmStats.	
            // The conditional branches in the following code segment follow the flowchart for the	
            // Volleyball Game Sync process specified in progress report #1 for MJOLNIR.	
            await admin.database().ref("/v1/" + gameId + "/game-actions").once('value').then((snapshot) => {
                // Update uprmPlayerStats and uprmStats based on each volleyball play (from game actions).	
                snapshot.forEach((gameAction) => {

                    const actionType: string = <string>gameAction.child("action_type").val();

                    // Update statistics only if it is a play corresponding to UPRM team.	
                    if (actionType !== "Notification") {
                        const team: string = <string>gameAction.child("team").val();

                        if (team === "uprm") {
                            const player: string = <string>gameAction.child("athlete_id").val();
                            let index = -1;
                            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                                if (uprmPlayerKeys[i] == player) {
                                    index = i;
                                }
                            }
                            if (index >= 0) {
                                updateVolleyballStats(actionType, uprmPlayerStats[index], uprmStats);
                            } else {
                                console.log("ATHLETE NOT FOUND " + player);
                            }
                        }
                    }
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve game actions.");
                return null;
            });

            // Prepare uprmPlayerStats to be added into the request payload.	
            let athleteStats: any = [];
            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                athleteStats.push(
                    {
                        "athlete_id": uprmPlayerKeys[i],
                        "statistics": uprmPlayerStats[i].getJSON()
                    }
                );
            }

            /*	
                <Section 3>	
                    In this section, all the statistics have been calculated. The only	
                    missing task is to build the JSON payload and send the HTTPS request	
                    to Odin API.	
            */

            // Prepare payload.	
            const gameStatistics = <JSON><unknown>{
                "event_id": gameId.toString(),
                "team_statistics": uprmStats.getJSON(),
                "athlete_statistics": athleteStats,
                "uprm_score": uprmScore,
                "opponent_score": opponentScore
            };

            console.log(gameStatistics);

            // Send game statistics to Odin API.	
            postVolleyballResults(gameStatistics).then(() => {
                console.log("POSTED");
            }).catch(error => {
                console.log(error);
            })

            // End of PBPGameSync process.	
            return;
        }
        else if (sport=="Baloncesto"){
            // Obtain game score by each team.
            let uprmScore: number = 0;
            let opponentScore: number = 0;

            await admin.database().ref("/v1/" + gameId + "/score").once('value').then((snapshot) => {
                // Find the score on each quarter and calculate the number of quarter won by each team.	
                for (let i = 1; i <= 10; i++) {

                    const uprmPoints: number = snapshot.child("quater" + i + "-uprm").val();
                    const opponentPoints: number = snapshot.child("quater" + i + "-opponent").val();

                    uprmScore+=uprmPoints;

                    opponentScore+=opponentPoints;
                }
                console.log(opponentScore);
                console.log(uprmScore);
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve score.");
                return null;
            });

            // If the game is marked as over and is a volleyball game, start sync process.	

            /*	
                <Section 2>	
                    This section represents the first process block of the flowchart in which	
                    uprm-player-stats (uprmPlayerStats in code) and uprm-stats (uprmStats) are	
                    initialized. Note that in this implementation, when the game actions are	
                    retrieved, uprmPlayerStats and uprmStats collections are being modified.	
            */

            //Initialize Variables.	
            let uprmPlayerStats: BasketballStatsEntry[] = [];
            let uprmPlayerKeys: string[] = [];
            let uprmStats: BasketballStatsEntry = new BasketballStatsEntry();

            // Retrieve UPRM roster from RTDB.	
            await admin.database().ref("/v1/" + gameId + "/uprm-roster").once('value').then((snapshot) => {
                // Insert athlete VolleyballStatsEntry into the uprmPlayerStats map.	
                snapshot.forEach((athleteSnap) => {
                    const athleteKey: string = <string>athleteSnap.child("athlete_id").val();
                    uprmPlayerKeys.push(athleteKey);
                    uprmPlayerStats.push(new BasketballStatsEntry());
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve UPRM roster.");
                return null;
            });

            console.log(uprmPlayerStats);

            // Retrieve game actions and per each game action modify uprmPlayerStats and uprmStats.	
            // The conditional branches in the following code segment follow the flowchart for the	
            // Volleyball Game Sync process specified in progress report #1 for MJOLNIR.	
            await admin.database().ref("/v1/" + gameId + "/game-actions").once('value').then((snapshot) => {
                // Update uprmPlayerStats and uprmStats based on each volleyball play (from game actions).	
                snapshot.forEach((gameAction) => {

                    const actionType: string = <string>gameAction.child("action_type").val();

                    // Update statistics only if it is a play corresponding to UPRM team.	
                    if (actionType !== "Notification") {
                        const team: string = <string>gameAction.child("team").val();

                        if (team === "uprm") {
                            const player: string = <string>gameAction.child("athlete_id").val();
                            let index = -1;
                            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                                if (uprmPlayerKeys[i] == player) {
                                    index = i;
                                }
                            }
                            if (index >= 0) {
                                updateBasketballStats(actionType, uprmPlayerStats[index], uprmStats);
                            } else {
                                console.log("ATHLETE NOT FOUND " + player);
                            }
                        }
                    }
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve game actions.");
                return null;
            });

            // Prepare uprmPlayerStats to be added into the request payload.	
            let athleteStats: any = [];
            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                athleteStats.push(
                    {
                        "athlete_id": uprmPlayerKeys[i],
                        "statistics": uprmPlayerStats[i].getJSON()
                    }
                );
            }

            /*	
                <Section 3>	
                    In this section, all the statistics have been calculated. The only	
                    missing task is to build the JSON payload and send the HTTPS request	
                    to Odin API.	
            */

            // Prepare payload.	
            const gameStatistics = <JSON><unknown>{
                "event_id": gameId.toString(),
                "team_statistics": uprmStats.getJSON(),
                "athlete_statistics": athleteStats,
                "uprm_score": uprmScore,
                "opponent_score": opponentScore
            };

            console.log(gameStatistics);

            //Send game statistics to Odin API.	
            postBasketballResults(gameStatistics).then(() => {
                console.log("POSTED");
            }).catch(error => {
                console.log(error);
            })

            // End of PBPGameSync process.	
            return;
        }
        else if (sport=="Futbol"){
            // Obtain game score by each team.
            let uprmScore: number = 0;
            let opponentScore: number = 0;

            await admin.database().ref("/v1/" + gameId + "/score").once('value').then((snapshot) => {
                // Find the score on each quarter and calculate the number of quarter won by each team.	
                for (let i = 1; i <= 10; i++) {

                    const uprmPoints: number = snapshot.child("set" + i + "-uprm").val();
                    const opponentPoints: number = snapshot.child("set" + i + "-opponent").val();

                    uprmScore+=uprmPoints;

                    opponentScore+=opponentPoints;
                }
                console.log(opponentScore);
                console.log(uprmScore);
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve score.");
                return null;
            });

            // If the game is marked as over and is a volleyball game, start sync process.	

            /*	
                <Section 2>	
                    This section represents the first process block of the flowchart in which	
                    uprm-player-stats (uprmPlayerStats in code) and uprm-stats (uprmStats) are	
                    initialized. Note that in this implementation, when the game actions are	
                    retrieved, uprmPlayerStats and uprmStats collections are being modified.	
            */

            //Initialize Variables.	
            let uprmPlayerStats: SoccerStatsEntry[] = [];
            let uprmPlayerKeys: string[] = [];
            let uprmStats: SoccerStatsEntry = new SoccerStatsEntry();

            // Retrieve UPRM roster from RTDB.	
            await admin.database().ref("/v1/" + gameId + "/uprm-roster").once('value').then((snapshot) => {
                // Insert athlete VolleyballStatsEntry into the uprmPlayerStats map.	
                snapshot.forEach((athleteSnap) => {
                    const athleteKey: string = <string>athleteSnap.child("athlete_id").val();
                    uprmPlayerKeys.push(athleteKey);
                    uprmPlayerStats.push(new SoccerStatsEntry());
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve UPRM roster.");
                return null;
            });

            console.log(uprmPlayerStats);

            // Retrieve game actions and per each game action modify uprmPlayerStats and uprmStats.	
            // The conditional branches in the following code segment follow the flowchart for the	
            // Volleyball Game Sync process specified in progress report #1 for MJOLNIR.	
            await admin.database().ref("/v1/" + gameId + "/game-actions").once('value').then((snapshot) => {
                // Update uprmPlayerStats and uprmStats based on each volleyball play (from game actions).	
                snapshot.forEach((gameAction) => {

                    const actionType: string = <string>gameAction.child("action_type").val();

                    // Update statistics only if it is a play corresponding to UPRM team.	
                    if (actionType !== "Notification") {
                        const team: string = <string>gameAction.child("team").val();

                        if (team === "uprm") {
                            const player: string = <string>gameAction.child("athlete_id").val();
                            let index = -1;
                            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                                if (uprmPlayerKeys[i] == player) {
                                    index = i;
                                }
                            }
                            if (index >= 0) {
                                updateSoccerStats(actionType, uprmPlayerStats[index], uprmStats);
                            } else {
                                console.log("ATHLETE NOT FOUND " + player);
                            }
                        }
                    }
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve game actions.");
                return null;
            });

            // Prepare uprmPlayerStats to be added into the request payload.	
            let athleteStats: any = [];
            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                athleteStats.push(
                    {
                        "athlete_id": uprmPlayerKeys[i],
                        "statistics": uprmPlayerStats[i].getJSON()
                    }
                );
            }

            /*	
                <Section 3>	
                    In this section, all the statistics have been calculated. The only	
                    missing task is to build the JSON payload and send the HTTPS request	
                    to Odin API.	
            */

            // Prepare payload.	
            const gameStatistics = <JSON><unknown>{
                "event_id": gameId.toString(),
                "team_statistics": uprmStats.getJSON(),
                "athlete_statistics": athleteStats,
                "uprm_score": uprmScore,
                "opponent_score": opponentScore
            };

            console.log(gameStatistics);

            //Send game statistics to Odin API.	
            postSoccerResults(gameStatistics).then(() => {
                console.log("POSTED");
            }).catch(error => {
                console.log(error);
            })

            // End of PBPGameSync process.	
            return;
        }

        else if (sport=="Beisbol"){
            // Obtain game score by each team.
            let uprmScore: number = 0;
            let opponentScore: number = 0;

            await admin.database().ref("/v1/" + gameId + "/score").once('value').then((snapshot) => {
                // Find the score on each quarter and calculate the number of quarter won by each team.	
                for (let i = 1; i <= 25; i++) {

                    const uprmPoints: number = snapshot.child("set" + i + "-uprm").val();
                    const opponentPoints: number = snapshot.child("set" + i + "-opponent").val();

                    uprmScore+=uprmPoints;

                    opponentScore+=opponentPoints;
                }
                console.log(opponentScore);
                console.log(uprmScore);
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve score.");
                return null;
            });

            // If the game is marked as over and is a volleyball game, start sync process.	

            /*	
                <Section 2>	
                    This section represents the first process block of the flowchart in which	
                    uprm-player-stats (uprmPlayerStats in code) and uprm-stats (uprmStats) are	
                    initialized. Note that in this implementation, when the game actions are	
                    retrieved, uprmPlayerStats and uprmStats collections are being modified.	
            */

            //Initialize Variables.	
            let uprmPlayerStats: BaseballStatsEntry[] = [];
            let uprmPlayerKeys: string[] = [];
            let uprmStats: BaseballStatsEntry = new BaseballStatsEntry();

            // Retrieve UPRM roster from RTDB.	
            await admin.database().ref("/v1/" + gameId + "/uprm-roster").once('value').then((snapshot) => {
                // Insert athlete VolleyballStatsEntry into the uprmPlayerStats map.	
                snapshot.forEach((athleteSnap) => {
                    const athleteKey: string = <string>athleteSnap.child("athlete_id").val();
                    uprmPlayerKeys.push(athleteKey);
                    uprmPlayerStats.push(new BaseballStatsEntry());
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve UPRM roster.");
                return null;
            });

            console.log(uprmPlayerStats);

            // Retrieve game actions and per each game action modify uprmPlayerStats and uprmStats.	
            // The conditional branches in the following code segment follow the flowchart for the	
            // Volleyball Game Sync process specified in progress report #1 for MJOLNIR.	
            await admin.database().ref("/v1/" + gameId + "/game-actions").once('value').then((snapshot) => {
                // Update uprmPlayerStats and uprmStats based on each volleyball play (from game actions).	
                snapshot.forEach((gameAction) => {

                    const actionType: string = <string>gameAction.child("action_type").val();

                    // Update statistics only if it is a play corresponding to UPRM team.	
                    if (actionType !== "Notification") {
                        const team: string = <string>gameAction.child("team").val();

                        if (team === "uprm") {
                            const player: string = <string>gameAction.child("athlete_id").val();
                            let index = -1;
                            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                                if (uprmPlayerKeys[i] == player) {
                                    index = i;
                                }
                            }
                            if (index >= 0) {
                                updateBaseballStats(actionType, uprmPlayerStats[index], uprmStats);
                            } else {
                                console.log("ATHLETE NOT FOUND " + player);
                            }
                        }
                    }
                });
            }).catch(() => {
                console.log("PBPGameSync Error: Unable to retrieve game actions.");
                return null;
            });

            // Prepare uprmPlayerStats to be added into the request payload.	
            let athleteStats: any = [];
            for (let i = 0; i < uprmPlayerKeys.length; i++) {
                athleteStats.push(
                    {
                        "athlete_id": uprmPlayerKeys[i],
                        "statistics": uprmPlayerStats[i].getJSON()
                    }
                );
            }

            /*	
                <Section 3>	
                    In this section, all the statistics have been calculated. The only	
                    missing task is to build the JSON payload and send the HTTPS request	
                    to Odin API.	
            */

            // Prepare payload.	
            const gameStatistics = <JSON><unknown>{
                "event_id": gameId.toString(),
                "team_statistics": uprmStats.getJSON(),
                "athlete_statistics": athleteStats,
                "uprm_score": uprmScore,
                "opponent_score": opponentScore
            };

            console.log(gameStatistics);

            //Send game statistics to Odin API.	
            postBaseballResults(gameStatistics).then(() => {
                console.log("POSTED");
            }).catch(error => {
                console.log(error);
            })

            // End of PBPGameSync process.	
            return;
        }

        else{
            return;
        }
        });