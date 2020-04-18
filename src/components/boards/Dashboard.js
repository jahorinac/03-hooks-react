import React, {Component} from 'react';
import Board from './Board'
import iconDropDown from "../../assets/icon-drop-down.svg";
import iconAvatar from "../../assets/icon-avatar.svg";
import iconAddUser from "../../assets/icon-add-user.svg";


class Dashboard extends Component{

    constructor(props){
        super(props);

        const INITIAL_STATE = this.props.passData[0];

        this.state = {
            ...INITIAL_STATE
        }
    }

    // setTypeOfBoard = () => {
    //     return this.typeOfBoards.map((item, index) => {
    //         return <Board key={index} {...item} />
    //     })
    // };

    update = cardId => {
        const notDeletedCards = this.deleteCard(cardId)

        return this.setState(
            {
                cards:[
                    ...notDeletedCards
                ]
            }
        );
    };

    deleteCard = (id) => {
        const cards = this.state.cards;

        return cards.filter((item) => {
            return item.cardId !== id
        });
    };

    render(){
        return(
            <div className="board-container w-100 px-5 py-4">
                <div className="d-flex justify-content-between pb-4">
                    <div className="d-flex">
                        <h2>Studio Board</h2>
                        <img src={iconDropDown}/>
                    </div>
                    <div>
                        <img src={iconAvatar}/>
                        <img src={iconAvatar}/>
                        <img src={iconAvatar}/>
                        <img src={iconAvatar}/>
                        <img src={iconAvatar}/>
                        <img src={iconAddUser}/>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    { this.state.cardStatuses.map((statusItem, index) => {

                            const cards = this.state.cards;
                            const cardsByStatus = cards.filter(card => card.status === statusItem.title);

                            return <Board
                                        key={ index } { ...statusItem }
                                        appProp={ this.update }
                                        passCards={ cardsByStatus }
                                    />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard