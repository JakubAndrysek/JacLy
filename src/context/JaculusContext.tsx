import {createContext, FC, InputHTMLAttributes, useContext, useEffect, useState} from "react";
import {JacDevice} from "jaculus-tools/dist/src/device/jacDevice.js";

export const DeviceContext = createContext({
    device: null as JacDevice | null,
    setNewDevice: (device: JacDevice | null) => {
    },
    disconnectDevice: () => {
    },
    connected: false,
    setConnected: (connected: boolean) => {
    },
});

interface DeviceProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const DeviceProvider: FC<DeviceProps> = ({children}) => {
    const [device, setDevice] = useState<JacDevice | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        console.log("DeviceProvider: ", device)
    }, [device]);

    const setNewDevice = (device: JacDevice | null) => {
        if (device) {
            device.destroy();
        }
        setDevice(device);
    }

    const disconnectDevice = () => {
        setNewDevice(null);
    }

    return (
        <DeviceContext.Provider
            value={{
                // @ts-ignore
                device: device,
                setNewDevice: setNewDevice,
                disconnectDevice: disconnectDevice,
                connected: connected,
                setConnected: setConnected,
            }}
        >
            {children}
        </DeviceContext.Provider>
    );
};

export default DeviceProvider;

export function useDevice() {
    return useContext(DeviceContext);
}