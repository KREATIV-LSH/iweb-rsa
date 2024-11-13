import Header from "./components/Header";

function App() {
    return (
      <div className="flex h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-col h-screen w-screen">
          <Header />
          <h1>App</h1>
        </div>
      </div>
    );
}

export default App;
