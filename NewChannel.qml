import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Page {
    id: newChannel
    title: "New Channel"
    property alias contactsModel: contactsModel.model
    property alias contactSearch: contactSearch

    JsonModel {
        id: contactsModel
        dataUrl: "data/contacts.json"
        onIsLoaded: {
            console.log("Loaded Contacts")
        }
    }

    JsonModel {
        id: channelsModel
        dataUrl: "data/channels.json"
        onIsLoaded: {
            console.log("Channels loaded")
        }
    }

    ColumnLayout {
        anchors.fill: parent
        RowLayout {
            Layout.fillWidth: true
            Label {
                text: "To: "
                color: "black"
            }
            TextInput {
                id: contactSearch
                Layout.fillWidth: true
                focus: true
                function containsNameOrHandle(contact) {
                    return contact.name.toLowerCase().indexOf(contactSearch.getText(0, contactSearch.length).toLowerCase()) !== -1;
                }
                onTextChanged: {
                    contactsModel.filter(containsNameOrHandle)
                }
            }
        }
        Rectangle {
                  border.width: 1
                  height: 2
                  width: parent.width
                  anchors.margins: 20
                  border.color: "#2d2b19"
              }
        ListView {
            id: contactsListView
            Layout.fillWidth: true
            Layout.fillHeight: true
            topMargin: 48
            leftMargin: 48
            bottomMargin: 48
            rightMargin: 48
            spacing: 20
            model: contactsModel.model
            delegate: ContactDelegate{
                createChannel: true
                stackView: newChannel.StackView.view
            }
        }
    }
}

/*##^## Designer {
    D{i:0;autoSize:true;height:480;width:640}
}
 ##^##*/
