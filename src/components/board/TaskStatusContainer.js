import React, {Component} from 'react';
import TaskStatus from './TaskStatus'
import Dragula from 'react-dragula';
import iconAvatar from "../../assets/icon-avatar.svg";
import iconAddUser from "../../assets/icon-add-user.svg";


class TaskStatusContainer extends Component{

    update = cardId => {
        const notDeletedCards = this.deleteCard(cardId)

        this.setState({
                cards : notDeletedCards
            }, this.updateAppState
        );
    };

    updateAppState = () =>{
        this.props.updateApp(this.state)
    };

    deleteCard = (id) => {
        const cards = this.props.passData.cards;

        return cards.filter((item) => {
            return item.cardId !== id
        });
    };

    componentDidMount() {

        const options={};

        options.accepts = function(el, target, source){
            return source.parentElement.nextElementSibling === target.parentElement
        };

        Dragula(this.statusTaskContainers, options);
    }

    statusTaskContainers = [];

    collectTaskContainers = (param) => {
        this.statusTaskContainers.push(param);
    };

    setTaskStatuses = () => {
        return this.props.passData.cardStatuses.slice(1).map((statusItem, index) => {

            const cards = this.props.passData.cards;
            const cardsByStatus = cards.filter(card => card.status === statusItem.title);

            return <TaskStatus
                        key={ index } { ...statusItem }
                        appProp={ this.update }
                        passCards={ cardsByStatus }
                        getRef={this.collectTaskContainers}
                    />
        })
    };

    render(){
        return(
            <div className="board-container w-100 px-xl-5 px-3 py-4 d-flex flex-column">
                <div className="d-flex justify-content-between pb-4">
                    <div className="d-flex">
                        <h2>Board</h2>
                    </div>
                    <div>
                        <img src={iconAvatar}/>
                        <img src={iconAvatar} className="p-2"/>
                        <img src={iconAvatar} className="p-2"/>
                        <img src={iconAvatar} className="p-2"/>
                        <img src={iconAvatar} className="p-2"/>
                        <img src={iconAddUser} className="p-2"/>
                    </div>
                </div>
                <div className="d-flex justify-content-between flex-grow-1">
                    {this.setTaskStatuses()}
                </div>
            </div>
        )
    }
}

export default TaskStatusContainer