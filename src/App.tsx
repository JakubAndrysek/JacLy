import { useEffect, useState, useRef } from 'react';
import './index.css';

import { BlocklyWorkspace } from 'react-blockly';

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

  return <div className="w-full bg-gray-500 rounded p-2">
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

  return <>
    <div className='w-full'>
      <Button text="Clear"
              classNames='bg-blue-500 m-1 '
              onClick={() => setText("")}/>
    </div>
    <div className='w-full bg-gray-50 m-2 p-2 font-mono'>
      <pre>
        {text}
      </pre>
    </div>
  </>;
}

function CodeEditor(props: {
  device: JacDevice | null
}) {
  const [xml, setXml] = useState<string>();

  return (
    <BlocklyWorkspace
      className="w-full" // you can use whatever classes are appropriate for your app's CSS
      toolboxConfiguration={INITIAL_TOOLBOX_JSON} // this must be a JSON toolbox definition
      initialXml={xml}
      onXmlChange={setXml}
    />
  )
}


function App() {
  const [device, setDevice] = useState< JacDevice | null>(null);

  const handleNewDevice = (dev: JacDevice | null) => {
    if (device)
      device.destroy();
    setDevice(dev);
  }

  return (
    <div className="">
      <ConnectionBar
        device={device}
        onConnection={handleNewDevice}
        onDisconnection={() => handleNewDevice(null)}/>
      <div className='w-full flex'>
      <div className='w-2/3'>
          <CodeEditor device={device}/>
        </div>
        <div className='w-1/3'>
          <Monitor device={device}/>
        </div>
      </div>
    </div>)
}

export default App
