const fs = require('fs');

// Path to the JSON file
const filePathCN = '../ArknightsGameData/zh_CN/gamedata/excel/character_table.json';
const filePathEN = './en_US/gamedata/excel/character_table.json';
const filePathJP = './ja_JP/gamedata/excel/character_table.json';
const gameDataFilePath = '../game-toolbox/src/components/Games/Arknights/Content/Json/charData.json';

// Read and parse the JSON file
const characterDataCN = JSON.parse(fs.readFileSync(filePathCN, 'utf8'));
const characterDataEN = JSON.parse(fs.readFileSync(filePathEN, 'utf8'));
const characterDataJP = JSON.parse(fs.readFileSync(filePathJP, 'utf8'));
const gameData = JSON.parse(fs.readFileSync(gameDataFilePath, 'utf8'));

let jsonData = []

// Extract character details
Object.keys(characterDataEN).map(key => {
    let charCN = characterDataCN[key];
    let charEN = characterDataEN[key];
    let charJP = characterDataJP[key];
    
    // Extract and return the necessary character details
    if (key.startsWith("trap") || key.startsWith("token") || charCN.isNotObtainable == true || charCN.subProfessionId.startsWith("notchar")) { 

    } else {
        jsonData.push({
            id: key,
            name: charCN.name,
            nameEn: charEN.name,
            nameJP: charJP ? charJP.name : '',
            rarity: charCN.rarity[5],
            class: getClass(charCN),
            classEn: getClassEN(charCN),
            subclassEN: getSubClassEN(charCN),
            talent1EN: charEN.talents,
            tagListEN: charEN.tagList,
        })
    }
});

function getClass(currChara){
    switch(currChara.profession){
        case ("WARRIOR"): return "近卫";
        case ("MEDIC"): return "医疗";
        case ("PIONEER"): return "先锋";
        case ("CASTER"): return "术师";
        case ("SNIPER"): return "狙击";
        case ("TANK"): return "重装";
        case ("SUPPORT"): return "辅助";
        case ("SPECIAL"): return "特种";
        default : return "";
    }
}
function getClassEN(chara){
    switch(chara.profession){
        case ("WARRIOR"): return "Guard";
        case ("MEDIC"): return "Medic";
        case ("PIONEER"): return "Vanguard";
        case ("CASTER"): return "Caster";
        case ("SNIPER"): return "Sniper";
        case ("TANK"): return "Defender";
        case ("SUPPORT"): return "Supporter";
        case ("SPECIAL"): return "Specialist";
        default : return "";
    }
}
function getSubClassEN(chara){
    switch(chara.subProfessionId){
        //Medics 6 total
        case ("physician"): return "Single-target";
        case ("ringhealer"): return "Multi-target";
        case ("healer"): return "Therapist";
        case ("wandermedic"): return "Wandering Medic";
        case ("incantationmedic"): return "Incantation Medic";
        case ("chainhealer"): return "Chain Healer";

        //Guards 11 total
        case ("fearless"): return "Dreadnought";
        case ("centurion"): return "Centurion";
        case ("instructor"): return "Instructor";
        case ("lord"): return "Lord";
        case ("artsfghter"): return "Arts Fighter";
        case ("sword"): return "Swordmaster";
        case ("musha"): return "Musha";
        case ("crusher"): return "Crusher";
        case ("reaper"): return "Reaper";
        case ("fighter"): return "Fighter";
        case ("librator"): return "Liberator";

        //Specialist 8 total 
        case ("executor"): return "Executor";
        case ("merchant"): return "Merchant";
        case ("hookmaster"): return "Hookmaster";
        case ("stalker"): return "Ambusher";
        case ("pusher"): return "Push Stroker";
        case ("geek"): return "Geek";
        case ("traper"): return "Trapmaster";
        case ("dollkeeper"): return "DollKeeper";

        //Sniper 7 total
        case ("fastshot"): return "Marksman";
        case ("bombarder"): return "Flinger";
        case ("closerange"): return "Heavyshooter";
        case ("longrange"): return "Deadeye";
        case ("aoesniper"): return "Artilleryman";
        case ("siegesniper"): return "Besieger";
        case ("reaperrange"): return "Spreadshooter";

        //Defender 7 total
        case ("protector"): return "Protector";
        case ("guardian"): return "Guardian";
        case ("unyield"): return "Juggernuat";
        case ("duelist"): return "Duelist";
        case ("fortress"): return "Fortress";
        case ("artsprotector"): return "Arts Proterctor";
        case ("shotprotector"): return "Sentinel Protector";

        //Vanguard 5 total
        case ("pioneer"): return "Pioneer";
        case ("charger"): return "Charger";
        case ("tactician"): return "Tactician";
        case ("bearer"): return "Standard Bearer";
        case ("agent"): return "Agent";

        //caster 7 total
        case ("corecaster"): return "Core Caster";
        case ("splashcaster"): return "Splash Caster";
        case ("funnel"): return "Mech-accord Caster";
        case ("phalanx"): return "Phalanx Caster";
        case ("mystic"): return "Mystic Caster";
        case ("chain"): return "Chain Caste";
        case ("blastcaster"): return "Blast Caster";

        //supporter 7 total
        case ("summoner"): return "Summoner";
        case ("underminer"): return "Hexer";
        case ("slower"): return "Decel Binder";
        case ("craftsman"): return "Artificer";
        case ("bard"): return "Bard";
        case ("blessing"): return "Abjurer";
        case ("ritualist"): return "Ritualist";

        default : return "";
    }
}

jsonData.sort((a, b) => {
    return parseInt(b.rarity) - parseInt(a.rarity);
});

jsonData.forEach(item => {
    gameData.push(item)
});
console.log(gameData)
fs.writeFile(`../game-toolbox/src/components/Games/Arknights/Content/Json/charData.json`, JSON.stringify(gameData, null, '\t'), function (err) {
    console.log(err);
})
