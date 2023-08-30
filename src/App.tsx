import './index.css';
import DeviceProvider from "./context/JaculusContext";
import GenerateCodeProvider from "./context/GenerateCodeContext";
import ConnectionBar from "./components/topLevel/ConnectionBar";
import Header from "./components/topLevel/Header";
import BlocklyEditor from "./components/topLevel/BlocklyEditor";
import Monitor from "./components/topLevel/Monitor";
import "./customBlocks/customBlocks"
import CodeResult from "./components/topLevel/CodeResult";

function App() {
    return (
        <DeviceProvider>
            <GenerateCodeProvider>
                <div className="flex flex-col h-full">
                    <Header/>
                    <ConnectionBar/>
                    <div className='w-full h-5/6 flex flex-1'>
                        <div className='w-2/3 h-5/5'>
                            <BlocklyEditor/>
                        </div>
                        <div className='w-1/3 h-full'>
                            <div className='h-3/6'>
                                <CodeResult/>
                            </div>
                            <div className=''>
                                <Monitor/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </GenerateCodeProvider>
        </DeviceProvider>
    )
}

export default App
