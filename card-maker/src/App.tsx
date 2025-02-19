import styles from './App.module.css'
import { SlidesList } from './views/SlideList/SlideList.tsx'
import { TopPanel } from './views/TopPanel/TopPanel'
import { Workspace } from './views/WorkSpace/WorkSpace.tsx'
import { ToolBar } from "./views/ToolBar/ToolBar.tsx";
import { HistoryType } from "./store/utils/history.ts";
import { HistoryContext } from "./views/hooks/historyContenx.ts";

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
    return (
        <HistoryContext.Provider value={history}>
            <TopPanel></TopPanel>
            <ToolBar></ToolBar>
            <div className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </div>
        </HistoryContext.Provider>
    )
}

export default App