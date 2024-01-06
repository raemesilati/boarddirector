export const TabsHeaders = ({ handleTab, tab }) => {
    return <div className="tabs">
        <ul>
            <li >
                <button onClick={() => handleTab(0)} className={tab === 0 ? 'active' : ''}>
                    All Recipes
                </button>

            </li>
            <li >
                <button onClick={() => handleTab(1)} className={tab === 1 ? 'active' : ''}>
                    Favorites
                </button>
            </li>
        </ul>
    </div>
}