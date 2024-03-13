import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {qrbtfModuleC2, QrbtfRendererC2Props} from "@/lib/qrbtf_lib/qrcodes/c2";
import {ConfigType} from "@/lib/qrbtf_lib/qrcodes/common";

const params: ConfigType<QrbtfRendererC2Props>[] = [
]


export default function Page() {
  return (
    // <QrcodeGeneratorWithProvider
    //   namespace="qrcodes.sp1"
    //   qrcodeModule={qrbtfModuleC2}
    //   params={params}
    // />
    <div></div>
  );
}