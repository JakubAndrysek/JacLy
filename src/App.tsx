import { useEffect, useState, useRef } from 'react';
import './index.css';

import "./customBlocks/customBlocks"
import { BlocklyWorkspace } from 'react-blockly';
import Blockly from "blockly";
import {javascriptGenerator} from 'blockly/javascript';
import { Buffer } from "buffer";


import {Button} from "./components";

import { WebSerialStream } from './jac-glue.js';
import { JacDevice } from "jaculus-tools/dist/src/device/jacDevice.js";
// @ts-expect-error
import { INITIAL_TOOLBOX_JSON } from './blockly-config.js';

function ConnectionBar(props: {
  device: JacDevice | null,
  onConnection: ( dev: JacDevice ) => void,
  onDisconnection: () => void
}) {
  let whenConnected = () => {
    return <>
      <span className="px-2 text-green-500">Connected</span>
      <Button text="Disconnect"
              onClick={props.onDisconnection}/>
    </>;
  }

  let whenDisconnected = () => {
    return <>
      <span className="px-2 text-orange-500">Not connected</span>
      <Button text="Connect"
              onClick={() => {
                navigator.serial.requestPort()
                  .then( async port => {
                    await port.open({baudRate: 921600});
                    let stream = new WebSerialStream(port);
                    props.onConnection(new JacDevice(stream))
                  })
                  .catch((e) => {
                    alert(e.toString());
                    props.onDisconnection();
                  })
              }}/>
    </>
  }

  return <div className="w-full bg-gray-200 rounded p-2 mb-2">
    {
      props.device
        ? whenConnected()
        : whenDisconnected()
    }
  </div>;
}

function UploaderBar(props: {
    device: JacDevice | null,
}) {

  let path : string = "code/demo.js";
  let str : string = "console.log(\"Hello World!\");";

  async function upload() {
    if (!props.device)
      return;
    let device = props.device

    await device.controller.lock().catch((err) => {
      console.log("Error locking device: " + err);
      throw 1;
    });

    let buff = Buffer.from(str, "utf-8")
    const cmd = await device.uploader.writeFile(path, buff).catch((err) => {
      console.log("Error: " + err + "\n");
      throw 1;
    });

    // const cmd = await device.uploader.createDirectory(path).catch((err) => {
    //   console.log("Error: " + err + "\n");
    //   throw 1;
    // });

    await device.controller.unlock().catch((err) => {
      console.log("Error unlocking device: " + err);
      throw 1;
    });

    console.log(cmd.toString() + "\n");
    // const filePath = '/path/to/file.js';  // Specify the path where you want to upload the file on the device
    // const buffer = new TextEncoder().encode(code);
    // device.uploader.writeFile(filePath, buffer)
    //     .then(() => device.controller.runFile(filePath))  // Assuming the Controller class has a method runFile
    //     .catch(console.error);
  }

  function whenConnected() {

    return(
        <Button text="Upload"
                onClick={upload}/>
    )
  }

  function whenDisconnected() {
    return (
        <p>Not connected</p>
    )
  }


  return <div className="w-full bg-gray-200 rounded p-2 mb-2">
  {
  props.device
      ? whenConnected()
      : whenDisconnected()
  }
  </div>;
}

function Monitor(props: {
  device: JacDevice | null
}) {
  const [text, setText] = useState("");
  const appendText = (t: string) => setText(text + t);

  useEffect(() => {
    if (!props.device)
      return;
    props.device.programOutput.onData((data) => {
      appendText(data.toString());
    });
    props.device.programError.onData((data) => {
      appendText(data.toString());
    });
  }, [props.device, setText, text]);

  return <div className="h-full flex flex-col m-0 p-0">
    <div className='w-full m-0'>
      <Button text="Clear"
              classNames='bg-blue-300 m-1 w-full '
              onClick={() => setText("")}/>
    </div>
    <div className='flex-1 w-full h-full overflow-y-scroll bg-gray-50 m-2 p-2 font-mono'>
      <pre className='inline-block'>
        {text}
      </pre>
    </div>
  </div>;
}

function CodeEditor(props: {
  device: JacDevice | null
  onCodeChange: (code: string) => void
}) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg>();
  const handleWorkspaceChange = (newWorkspace: Blockly.WorkspaceSvg) => {
    console.log("Workspace changed")
    // try {
    //   workspaceRef.current = newWorkspace;
    const jsCode = javascriptGenerator.workspaceToCode(newWorkspace);
    console.log(jsCode);
    //   const code = Blockly.JavaScript.workspaceToCode(newWorkspace);
    //   console.log(code);
      // props.onCodeChange(code);
    // } catch (e) {
    //     console.error(e);
    // }

  };

  return (
      <BlocklyWorkspace
          className="w-full h-full"
          toolboxConfiguration={INITIAL_TOOLBOX_JSON}
          onWorkspaceChange={handleWorkspaceChange}
      />
  )
}

function Header() {
  return <div className='w-full text-xl p-2'>
    JacLy
  </div>
}

function App() {
  const [device, setDevice] = useState< JacDevice | null>(null);
  const [code, setCode] = useState<string>("");

  const handleNewDevice = (dev: JacDevice | null) => {
    if (device)
      device.destroy();
    setDevice(dev);
  }

  // useEffect(() => {
  //   if (device && code) {
  //     const filePath = '/path/to/file.js';  // Specify the path where you want to upload the file on the device
  //     const buffer = new TextEncoder().encode(code);
  //     device.uploader.writeFile(filePath, buffer)
  //         .then(() => device.controller.runFile(filePath))  // Assuming the Controller class has a method runFile
  //         .catch(console.error);
  //   }
  // }, [device, code]);

  return (
    <div className="flex flex-col h-full">
      <Header/>
      <ConnectionBar
        device={device}
        onConnection={handleNewDevice}
        onDisconnection={() => handleNewDevice(null)}/>
      <UploaderBar
        device={device}/>
      <div className='w-full flex flex-1'>
        <div className='w-2/3'>
          <CodeEditor device={device} onCodeChange={setCode}/>
        </div>
        <div className='w-1/3'>
          <Monitor device={device}/>
        </div>
      </div>
    </div>)
}

export default App
