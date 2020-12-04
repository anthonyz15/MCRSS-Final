export default {

    // Modify UPRM Set Scores.
    UPDATE_UPRM_SET(state, entry) {
        state.uprmSets.splice(entry.set - 1, 1, entry.score);
    },

    // Modify opponent Set Scores.
    UPDATE_OPP_SET(state, entry) {
        state.oppSets.splice(entry.set - 1, 1, entry.score);
    },

    // Update current set value.
    UPDATE_CURRENT_SET(state, set) {
        state.currentSet = set
    },

    // Insert athlete entry into UPRM roster.
    ADD_UPRM_ROSTER(state, athlete) {
        state.uprmRoster.push(athlete);
    },

    // Update athlete entry from UPRM roster.
    UPDATE_UPRM_ROSTER(state, athlete) {
        for (let index in state.uprmRoster) {
            if (state.uprmRoster[index].key == athlete.key) {
                state.uprmRoster.splice(index, 1, athlete);
                break;
            }
        }
    },

    // Remove athlete entry from UPRM roster.
    REMOVE_UPRM_ROSTER(state, key) {
        for (let index in state.uprmRoster) {
            console.log(key);
            if (state.uprmRoster[index].key == key) {
                state.uprmRoster.splice(index, 1);
                break;
            }
        }
    },

    // Insert athlete entry into opponent roster.
    ADD_OPP_ROSTER(state, athlete) {
        state.oppRoster.push(athlete);
    },

    // Update athlete entry from opponent roster.
    UPDATE_OPP_ROSTER(state, athlete) {
        console.log(athlete);
        for (let index in state.oppRoster) {
            if (state.oppRoster[index].key === athlete.key) {
                state.oppRoster.splice(index, 1, athlete);
                break;
            }
        }
    },

    // Remove athlete entry from opponent roster.
    REMOVE_OPP_ROSTER(state, key) {
        for (let index in state.oppRoster) {
            if (state.oppRoster[index].key === key) {
                state.oppRoster.splice(index, 1);
                break;
            }
        }
    },

    // Update game over state.
    SET_GAME_OVER(state, isOver) {
        state.gameOver = isOver
    },

    // Update opponent color.
    SET_OPP_COLOR(state, color) {
        state.oppColor = color
    },

    // Insert game action into actions list.
    ADD_GAME_ACTION(state, action) {
        state.gameActions.unshift(action);
    },

    // Update value of existing action.
    UPDATE_GAME_ACTION(state, action) {
        for (let index in state.gameActions) {
            if (state.gameActions[index].key === action.key) {
                state.gameActions.splice(index, 1, action);
                break;
            }
        }
    },

    // Remove entry from existing game actions.
    REMOVE_GAME_ACTION(state, key) {
        for (let index in state.gameActions) {
            if (state.gameActions[index].key === key) {
                state.gameActions.splice(index, 1);
                break;
            }
        }
    },

    // Update UPRM team statistics based on the game actions list.
    UPDATE_UPRM_STATISTICS(state) {//TODO--------------------------------------------------------------------
        let result = {
            hit: 0,
            strike: 0,
            ball: 0,
            out: 0,
            atBat: 0,
            run: 0,
            homerun: 0,
            runBattedIn: 0,
            strikeOut: 0,
            baseOnBall: 0,
            leftOnBase: 0
        };

        // For each game action, update result accordingly.
        for (let index in state.gameActions) {
            let currentAction = state.gameActions[index];
            if (currentAction.team !== "uprm") {
                continue;
            }
            switch (currentAction.action_type) {
                case "Hit":
                    result.hit++;
                    break;

                case "Strike":
                    result.strike++;
                    break;

                case "Homerun":
                    result.homerun++;
                    result.run++;
                    result.hit++;
                    break;

                case "Run":
                    result.run++;
                    break;

                case "AtBat":
                    result.atBat++;
                    break;

                case "RunBattedIn":
                    result.runBattedIn++;
                    
                    break;

                case "LeftOnBase":
                    result.leftOnBase++;
                    break;

                case "Ball":
                    result.ball++;
                    break;

                case "BaseOnBall":
                    result.baseOnBall++;
                    break;

                case "StrikeOut":
                    result.strikeOut++;
                    result.out++;
                    break;

                case "Out":
                    result.out++;
                    break;

                default:
                    break;
            }
        }

        state.uprmStatistics = result;
    },

    // Update opponent team statistics based on the game actions list.
    UPDATE_OPP_STATISTICS(state) {//TODO-------------------------------------------------------------
        let result = {
            hit: 0,
            strike: 0,
            ball: 0,
            out: 0,
            atBat: 0,
            run: 0,
            homerun: 0,
            runBattedIn: 0,
            strikeOut: 0,
            baseOnBall: 0,
            leftOnBase: 0
        };

        // For each game action, update result accordingly.
        for (let index in state.gameActions) {
            let currentAction = state.gameActions[index];
            if (currentAction.team !== "opponent") {
                continue;
            }
            switch (currentAction.action_type) {
                case "Hit":
                    result.hit++;
                    break;

                case "Strike":
                    result.strike++;
                    break;

                case "Homerun":
                    result.homerun++;
                    result.run++;
                    result.hit++;
                    break;

                case "Run":
                    result.run++;
                    break;

                case "AtBat":
                    result.atBat++;
                    break;

                case "RunBattedIn":
                    result.runBattedIn++;
                   
                    break;

                case "LeftOnBase":
                    result.leftOnBase++;
                    break;

                case "Ball":
                    result.ball++;
                    break;

                case "BaseOnBall":
                    result.baseOnBall++;
                    break;

                case "StrikeOut":
                    result.strikeOut++;
                    result.out++;
                    break;

                case "Out":
                    result.out++;
                    break;

                default:
                    break;
            }
        }

        state.oppStatistics = result;
    },

    // Update UPRM athlete statistics based on the game actions list.
    UPDATE_UPRM_ATHLETE_STATISTICS(state) {//TODO------------------------------------------------------------
        let result = [];

        for (let athlete in state.uprmRoster) {
            result.push(
                {
                    name: (state.uprmRoster[athlete].middle_name === '' ? state.uprmRoster[athlete].first_name + ' ' + state.uprmRoster[athlete].middle_name + ' ' + state.uprmRoster[athlete].last_names : state.uprmRoster[athlete].first_name + ' ' + state.uprmRoster[athlete].last_names),
                    number: state.uprmRoster[athlete].number,
                    hit: 0,
                    strike: 0,
                    ball: 0,
                    out: 0,
                    atBat: 0,
                    run: 0,
                    homerun: 0,
                    runBattedIn: 0,
                    strikeOut: 0,
                    baseOnBall: 0,
                    leftOnBase: 0
                }
            );
        }

        // For each game action, update athlete statistics accordingly.
        for (let index in state.gameActions) {
            let currentAction = state.gameActions[index];
            if (currentAction.team !== "uprm") {
                continue;
            }
            let athlete_index = -1;
            for (let athlete in state.uprmRoster) {
                if (state.uprmRoster[athlete].key == "athlete-" + currentAction.athlete_id) {
                    athlete_index = athlete;
                    break;
                }
            }
            // Continue when an athlete has been removed.
            if (athlete_index === -1) {
                continue;
            }

            switch (currentAction.action_type) {
                case "Hit":
                    result[athlete_index].hit++;
                    break;

                case "Strike":
                    result[athlete_index].strike++;
                    break;

                case "Homerun":
                    result[athlete_index].homerun++;
                    result[athlete_index].run++;
                    result[athlete_index].hit++;
                    break;

                case "Run":
                    result[athlete_index].run++;
                    break;

                case "AtBat":
                    result[athlete_index].atBat++;
                    break;

                case "RunBattedIn":
                    result[athlete_index].runBattedIn++;
                    
                    break;

                case "LeftOnBase":
                    result[athlete_index].leftOnBase++;
                    break;

                case "Ball":
                    result[athlete_index].ball++;
                    break;

                case "BaseOnBall":
                    result[athlete_index].baseOnBall++;
                    break;

                case "StrikeOut":
                    result[athlete_index].strikeOut++;
                    result[athlete_index].out++;
                    break;

                case "Out":
                    result[athlete_index].out++;
                    break;

                default:
                    break;
            }
        }

        state.uprmAthleteStatistics = result;
    },

    // Update opponent athlete statistics based on the game actions list.
    UPDATE_OPP_ATHLETE_STATISTICS(state) {//TODO-----------------------------------------------------------------------
        let result = [];

        for (let athlete in state.oppRoster) {
            result.push(
                {
                    name: state.oppRoster[athlete].name,
                    number: state.oppRoster[athlete].number,
                    hit: 0,
                    strike: 0,
                    ball: 0,
                    out: 0,
                    atBat: 0,
                    run: 0,
                    homerun: 0,
                    runBattedIn: 0,
                    strikeOut: 0,
                    baseOnBall: 0,
                    leftOnBase: 0
                }
            );
        }

        // For each game action, update athlete statistics accordingly.
        for (let index in state.gameActions) {
            let currentAction = state.gameActions[index];
            if (currentAction.team !== "opponent") {
                continue;
            }
            let athlete_index = -1;
            for (let athlete in state.oppRoster) {
                if (state.oppRoster[athlete].key == "athlete-" + currentAction.athlete_id) {
                    athlete_index = athlete;
                    break;
                }
            }

            // Continue when an athlete has been removed.
            if (athlete_index === -1) {
                continue;
            }

            switch (currentAction.action_type) {
                case "Hit":
                    result[athlete_index].hit++;
                    break;

                case "Strike":
                    result[athlete_index].strike++;
                    break;

                case "Homerun":
                    result[athlete_index].homerun++;
                    result[athlete_index].run++;
                    result[athlete_index].hit++;
                    break;

                case "Run":
                    result[athlete_index].run++;
                    break;

                case "AtBat":
                    result[athlete_index].atBat++;
                    break;

                case "RunBattedIn":
                    result[athlete_index].runBattedIn++;
                    
                    break;

                case "LeftOnBase":
                    result[athlete_index].leftOnBase++;
                    break;

                case "Ball":
                    result[athlete_index].ball++;
                    break;

                case "BaseOnBall":
                    result[athlete_index].baseOnBall++;
                    break;

                case "StrikeOut":
                    result[athlete_index].strikeOut++;
                    result[athlete_index].out++;
                    break;

                case "Out":
                    result[athlete_index].out++;
                    break;

                default:
                    break;
            }
        }

        state.oppAthleteStatistics = result;
    },

    // Set sport_name value.
    SET_SPORT_NAME(state, name) {
        state.sportName = name;
    },

    // Set hasPBP value.
    SET_HAS_PBP(state, value) {
        state.hasPBP = value;
    },

    // Set teamId value.
    SET_TEAM_ID(state, id) {
        state.teamId = id;
    },

    // Set validUPRMRoster value.
    SET_VALID_UPRM_ROSTER(state, roster) {
        state.validUPRMRoster = roster;
    },

    // Set sport branch value.
    SET_BRANCH(state, branch) {
        state.branch = branch;
    },

    // Set opponentName value.
    SET_OPPONENT_NAME(state, name) {
        state.opponentName = name;
    },

    // Clear function to be called before mounting component.
    CLEAR_STATE(state) {
        // Set every state attribute to its default value.
        state.currentSet = 0;
        state.uprmSets = [0, 0, 0, 0, 0];
        state.oppSets = [0, 0, 0, 0, 0];
        state.gameActions = [];
        state.uprmRoster = [];
        state.oppRoster = [];
        state.gameOver = false;
        state.oppColor = "";
        state.uprmStatistics = {//TODO
            hit: 0,
            strike: 0,
            ball: 0,
            out: 0,
            atBat: 0,
            run: 0,
            homerun: 0,
            runBattedIn: 0,
            strikeOut: 0,
            baseOnBall: 0,
            leftOnBase: 0
        };
        state.oppStatistics = {//TODO
            hit: 0,
            strike: 0,
            ball: 0,
            out: 0,
            atBat: 0,
            run: 0,
            homerun: 0,
            runBattedIn: 0,
            strikeOut: 0,
            baseOnBall: 0,
            leftOnBase: 0
        };
        state.uprmAthleteStatistics = []
        state.oppAthleteStatistics = [];
        state.hasPBP = true;
        state.sportName = "";
        state.teamId = 0;
        state.validUPRMRoster = []
        state.branch = "";
        state.opponentName = "";
    }
}