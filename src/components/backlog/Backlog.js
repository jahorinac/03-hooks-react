import React from 'react';

function Backlog(props) {
    console.log(props);

    const setTaskBacklog = () => {
        return props.cards.filter(task => {
            return task.status === 'backlog'
        }).map( task => {
            return <li key={task.cardId} className="list-group-item">{ task.title }</li>
        });
    };

    return (
        <div className="w-100 px-5 py-4">
            <div className="pb-4">
                <div>
                    <h2>Backlog</h2>
                </div>
            </div>
            <ul className="list-group">
                { setTaskBacklog() }
            </ul>
        </div>

    );
}

export default Backlog;