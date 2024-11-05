import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { chapters, chaptersData } from "./Chapters";

function App() {

    console.log(chapters);

    return (
      <div className="flex h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-col h-screen w-screen">
          <Header />
          <div className="flex flex-grow overflow-auto">
            <Sidebar chaptersData={chaptersData} />
          </div>
        </div>
      </div>
    );
}

export default App;
