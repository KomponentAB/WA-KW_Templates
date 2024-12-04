import { bootstrapExtra } from "@workadventure/scripting-api-extra";

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));


console.log('Script started successfully');

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        WA.ui.openPopup("clockPopup", "It's " + time, []);
    })




let helpPopup: any;
WA.onInit().then(() => {WA.room.area.onEnter('needHelpPopup').subscribe, () => {
helpPopup = WA.ui.openPopup('hopupHelp','Do you wanna know more about us? Explore our Hub!',[{
    label: 'Go to hub',
    className: 'primary',
    callback: () => WA.nav.openTab('https://world.cocreation.world')
}] )} 

WA.room.area.onLeave('needHelp').subscribe(() => {
    helpPopup.close();
})})




})

async function updateTitle(variableName: string) {
    var text: string = WA.state[variableName] as string;
    console.log(`Text for ${variableName} is configured as ` + text);
  var color = variableName.split('-')[0];
    var newTitle = `https://iw6tkif7th7yp5ax2ufzkl3kce0bcuys.lambda-url.us-east-1.on.aws/?text=${encodeURIComponent(text)}&imageType=caption&width=78&height=50&color=${(color)}`;
    console.log('New img-url of title is ' + newTitle);
    const website = await WA.room.website.get(variableName.replace('text', 'display'));
    website.url = newTitle;
    website.visible = true;
    console.log(`Title for ${variableName} has been changed to ${website.url}`);
};

WA.onInit().then(() => {
    updateTitle('purple-text');
    updateTitle('blue-text');
    updateTitle('red-text');
    updateTitle('green-text');
    updateTitle('yellow-text');
    updateTitle('orange-text');
    updateTitle('black-text');
});

// Listen for changes to each text variable
['purple-text', 'blue-text', 'red-text', 'green-text', 'yellow-text', 'orange-text', 'black-text'].forEach(variableName => {
    WA.state.onVariableChange(variableName).subscribe(() => {
        console.log(`${variableName} variable changed`);
        updateTitle(variableName);
    });
});


const groupIcons = {
    Yellow: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23FFD43B" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',
    Orange: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff6600" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',
    Green: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%2339fa14" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',
    Blue: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%230078ff" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',
    Purple: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff1493" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',
    Red: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff1a1a" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',
};

const groupCoordinates = {
    Yellow: { x: 1260, y: 1370 },
    Orange: { x: 1260, y: 1800 },
    Green: { x: 1260, y: 900 },
    Blue: { x: 500, y: 1330 },
    Purple: { x: 500, y: 1760 },
    Red: { x: 500, y: 900 },
    Auditorium: { x: 600, y: 1550 }
};

function addGroupButton(groupName: keyof typeof groupIcons) {
setTimeout(() => {
    WA.onInit().then(() => {
        const codeVariable = `code${groupName}`;
        const roomCode = WA.state[codeVariable];
        const chatTranslations = {
            'en-US': `The code to the ${groupName}-Room is: ${roomCode}.`,
            'fr-FR': `Le code de la salle ${groupName} est : ${roomCode}.`,
            'it-IT': `Il codice per la stanza ${groupName} è: ${roomCode}.`,
            'pt-BR': `O código para a sala ${groupName} é: ${roomCode}.`,
            'es-ES': `El código para la sala ${groupName} es: ${roomCode}.`,
            'zh-CN': `${groupName}房间的代码是：${roomCode}。`,
            'ar-SA': `رمز الغرفة ${groupName} هو: ${roomCode}.`,
            'de-DE': `Der Code für den ${groupName}-Raum lautet: ${roomCode}.`
        };
        const userLang = WA.player.language;
        const chatMessage = chatTranslations[userLang as keyof typeof chatTranslations] || chatTranslations['en-US'];
        WA.chat.sendChatMessage(chatMessage, "system");
    });
}, 2000);
    
    WA.ui.actionBar.addButton({
        id: 'roomNavigate-btn',
        type: 'action',
        imageSrc: groupIcons[groupName],
        toolTip: 'Go to your Breakout-Room.',
        callback: () => {
            removeGroupButton();
            const coordinates = groupCoordinates[groupName];
            
            WA.player.moveTo(coordinates.x, coordinates.y, 10).then((result) => {
                if (!result.cancelled) {
                    const codeVariable = `code${groupName}`;
                    const roomCode = WA.state[codeVariable];
                
                    WA.ui.banner.openBanner({
                        id: "room-code",
                        text: `🔐 🚪 The Code to the ${groupName}-Room is: ${roomCode}.`,
                        bgColor: `#25222d`,
                        textColor: "#ffffff",
                        closable: true,
                        timeToClose: 100000
                    });
                }
            })
        }
    });
};

function removeGroupButton() {
    WA.onInit().then(() => {
    WA.ui.actionBar.removeButton('roomNavigate-btn');
})}

WA.onInit().then(() => {
    WA.event.on('ping').subscribe((value) => {
        if (value.data === 'start') {
            const playerId = WA.player.uuid;
            if (playerId) {
                WA.event.broadcast('pong', playerId);
            } else {
                console.error('Player UUID is undefined');
            }
        } else if (value.data === 'stop') {
            WA.player.removeOutlineColor();
        }
    });
});

WA.onInit().then(() => {
    const playerId = WA.player.uuid;
    if (playerId) {
        WA.event.on(playerId).subscribe((value) => {
            console.log(`Received event for player UUID ${playerId}:`, value);
            const groupName = value.data as string; // "Yellow", "Orange", "Green", "Red", "Blue", or "Purple"
            handleGroupAssignment(groupName);
        });
    } else {
        console.error('Player UUID is undefined');
    }
})
    
function handleGroupAssignment(groupName: string) {
    WA.onInit().then(() => {
    const groupColors: { [key: string]: { r: number, g: number, b: number } } = {
        Yellow: { r: 255, g: 255, b: 0 },
        Orange: { r: 255, g: 102, b: 0 },
        Green: { r: 57, g: 255, b: 20 },
        Red: { r: 255, g: 26, b: 26 },
        Blue: { r: 0, g: 120, b: 255 },
        Purple: { r: 255, g: 20, b: 147 }
    };

    const color = groupColors[groupName];
    if (color) {
        WA.player.setOutlineColor(color.r, color.g, color.b);

        const roomColorIcon = {
            Yellow: '🟨',
           Orange: '🟧',
            Green: '🟩',
            Blue: '🟦',
            Purple: '🟪',
            Red: '🟥'
        };
        const roomName = `${roomColorIcon[groupName as keyof typeof roomColorIcon]} ${WA.state[`${groupName}-text`] || `${groupName.charAt(0).toUpperCase() + groupName.slice(1)} Room`}`;

        const translations = {
            'en-US': `You have been assigned to the ${roomName}.`,
            'fr-FR': `Vous avez été assigné à la ${roomName}.`,
            'it-IT': `Sei stato assegnato alla ${roomName}.`,
            'pt-BR': `Você foi designado para a ${roomName}.`,
            'es-ES': `Has sido asignado a la ${roomName}.`,
            'zh-CN': `你已被分配到${roomName}。`,
            'ar-SA': `لقد تم تعيينك إلى ${roomName}.`,
            'de-DE': `Sie wurden dem ${roomName} zugewiesen.`
        };

        const userLang = WA.player.language;
        const bannerText = translations[userLang as keyof typeof translations] || translations['en-US'];

        WA.ui.banner.openBanner({
            id: "group-assignment",
            text: bannerText,
            bgColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
            textColor: "#000000",
            closable: true,
            timeToClose: 10000
        });
        addGroupButton(groupName as keyof typeof groupIcons);

        const chatTranslations = {
            'en-US': `You have been assigned to the ${roomName}. The fastest way to get there is by clicking on the colored button at the bottom of your screen.`,
            'fr-FR': `Vous avez été assigné au ${roomName}. Le moyen le plus rapide de vous y rendre est de cliquer sur le bouton coloré en bas de votre écran.`,
            'it-IT': `Sei stato assegnato al ${roomName}. Il modo più veloce per arrivarci è cliccare sul pulsante colorato in fondo allo schermo.`,
            'pt-BR': `Você foi designado para o ${roomName}. A maneira mais rápida de chegar lá é clicando no botão colorido na parte inferior da sua tela.`,
            'es-ES': `Has sido asignado al ${roomName}. La forma más rápida de llegar es haciendo clic en el botón de color en la parte inferior de tu pantalla.`,
            'zh-CN': `你已被分配到${roomName}。最快的方法是点击屏幕底部的彩色按钮`,
            'ar-SA': `لقد تم تعيينك إلى ${roomName}.  هناك هي النقر على الزر الملون في أسفل الشاشة. رمز الغرفة هو`,
            'de-DE': `Du wurdest dem ${roomName} zugewiesen. Der schnellste Weg dorthin ist, auf den farbigen Knopf unten auf deinem Bildschirm zu klicken.`
        };

        const chatMessage = chatTranslations[userLang as keyof typeof chatTranslations] || chatTranslations['en-US'];
        WA.chat.sendChatMessage(chatMessage, "system");
    } else {
        console.warn('Unknown group name:', groupName);
    }
})};


WA.onInit().then(() => {
    function addStartGroupingButton() {            
        const svgIcon1 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="%23ff0019" d="M132.7 212.3 36.2 137.8A63.4 63.4 0 0 0 32 160a63.8 63.8 0 0 0 100.7 52.3zm40.4 62.3A63.8 63.8 0 0 0 128 256H64A64.1 64.1 0 0 0 0 320v32a32 32 0 0 0 32 32H97.9A146.6 146.6 0 0 1 173.1 274.6zM544 224a64 64 0 1 0 -64-64A64.1 64.1 0 0 0 544 224zM500.6 355.1a114.2 114.2 0 0 0 -84.5-65.3L361 247.2c41.5-16.3 71-55.9 71-103.2A111.9 111.9 0 0 0 320 32c-57.1 0-103.7 42.8-110.6 98.1L45.5 3.4A16 16 0 0 0 23 6.2L3.4 31.5A16 16 0 0 0 6.2 53.9L594.5 508.6A16 16 0 0 0 617 505.8l19.6-25.3a16 16 0 0 0 -2.8-22.5zM128 403.2V432a48 48 0 0 0 48 48H464a47.5 47.5 0 0 0 12.6-1.9L232 289.1C173.7 294.8 128 343.4 128 403.2zM576 256H512a63.8 63.8 0 0 0 -45.1 18.6A146.3 146.3 0 0 1 542 384h66a32 32 0 0 0 32-32V320A64.1 64.1 0 0 0 576 256z"/></svg>';            
        WA.ui.actionBar.removeButton('startGrouping-btn');
        WA.ui.actionBar.addButton({
            id: 'endGrouping-btn',
            type: 'action',
            imageSrc: svgIcon1,
            toolTip: 'End Breakout Grouping',
            callback: () => {
                WA.state.grouping = 0;
                WA.ui.actionBar.removeButton('endGrouping-btn');
                addEndGroupingButton();
                WA.event.broadcast('addGroupingButton', 'pressed');
            }
        });
    }
    
    function addEndGroupingButton() {
        const svgIcon2 = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="%2363E6BE" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"/></svg>';            
        WA.ui.actionBar.removeButton('endGrouping-btn');
        WA.ui.actionBar.addButton({
            id: 'startGrouping-btn',
            type: 'action',
            imageSrc: svgIcon2,
            toolTip: 'Start Breakout Grouping',
            callback: () => {
                WA.state.grouping = 1;
                WA.ui.actionBar.removeButton('startGrouping-btn');
                addStartGroupingButton();
                WA.event.broadcast('endGroupingButton', 'pressed');
            }
        });
    }
    
    
            WA.event.on('addGroupingButton').subscribe((value) => {
                if (["admin", "editor", "moderator", "hackmod"].some(tag => WA.player.tags.includes(tag))) {
                if (value.data === 'pressed') {
                    WA.ui.actionBar.removeButton('startGrouping-btn');
                    addEndGroupingButton();
                }
                }
            });
    
            WA.event.on('endGroupingButton').subscribe((value) => {
                if (["admin", "editor", "moderator", "hackmod"].some(tag => WA.player.tags.includes(tag))) {
                if (value.data === 'pressed') {
                    WA.ui.actionBar.removeButton('endGrouping-btn');
                    addStartGroupingButton();
                }
                }
            });
        WA.onInit().then(() => {
            if (WA.player.tags.includes("editor")) {
                WA.state.onVariableChange('showGroupingButton').subscribe({
                    next: () => {
                        const showGroupingButton = WA.state.showGroupingButton;
                        const groupingState = Number(WA.state.grouping);
                        if (showGroupingButton === "show") {
                            if (groupingState === 1) {
                                addStartGroupingButton();
                            } else if (groupingState === 0) {
                                addEndGroupingButton();
                            }
                        } else if (showGroupingButton === "hide") {
                            WA.ui.actionBar.removeButton('startGrouping-btn');
                            WA.ui.actionBar.removeButton('endGrouping-btn');
                        }
                    }
                });
    
                const groupingState = Number(WA.state.grouping);
                if (groupingState === 1) {
                    addStartGroupingButton();
                } else if (groupingState === 0) {
                    addEndGroupingButton();
                }
            }
        });
    
        WA.onInit().then(() => {
            const handleLockAllChange = () => {
                const lockAll = WA.state.lockAll;
                if (lockAll === "locked") {
                    WA.room.hideLayer("above_opened");
                    WA.room.hideLayer("rooms_opened");
                    WA.room.showLayer("rooms_closed");
                } else if (lockAll === "open") {
                    WA.room.showLayer("above_opened");
                    WA.room.showLayer("rooms_opened");
                    WA.room.hideLayer("rooms_closed");
                }
            };
    
            handleLockAllChange();
    
            WA.state.onVariableChange('lockAll').subscribe(() => {
                handleLockAllChange();
            });
        });
    
     

    WA.onInit().then(() => {
        WA.event.on('ping').subscribe((value) => {
            if (value.data === 'start') {
                const playerId = WA.player.uuid;
                if (playerId) {
                    WA.event.broadcast('pong', playerId);
                    WA.event.on(playerId).subscribe((value) => {
                        console.log(`Received event for player UUID ${playerId}:`, value);
                    });
                } else {
                    console.error('Player UUID is undefined');
                }
            } else if (value.data === 'stop') {
                WA.player.removeOutlineColor();
                removeGroupButton();
        
                const endTranslations = {
                    'en-US': "There is no group phase active at the moment. Please regroup with everyone else.",
                    'fr-FR': "Aucune phase de groupe n'est actuellement active. S'il te plaît, rassemble-toi à nouveau avec tous les autres.",
                    'it-IT': "Al momento non è attiva alcuna fase di gruppo. Si prega di riunirsi di nuovo con tutti gli altri.",
                    'pt-BR': "Nenhuma fase de grupo está ativa no momento. Por favor, reúna-se novamente com todos os outros.",
                    'es-ES': "Actualmente no hay ninguna fase de grupo activa. Por favor, reúnanse de nuevo con todos los demás.",
                    'zh-CN': "目前没有活跃的小组阶段。请与其他人重新组合。",
                    'ar-SA': "لا توجد مرحلة مجموعة نشطة حاليًا. يرجى التجمع مرة أخرى مع الجميع.",
                    'de-DE': "Aktuell ist keine Gruppenphase aktiv. Bitte sammle dich wieder mit allen anderen."
                };
        
                const endMessage = endTranslations[WA.player.language as keyof typeof endTranslations] || endTranslations['en-US'];
                WA.chat.sendChatMessage(endMessage, "system");
            }
        });
    });});
