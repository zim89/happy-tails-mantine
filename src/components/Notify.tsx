import { Notification, NotificationProps } from "@mantine/core";

type NotifyProps = {
    text: string;
    visible: boolean;
    onClose: () => void;
} & Omit<NotificationProps, "onClose">;
export default function Notify({ visible, text, onClose, ...props }: NotifyProps) {
  if (!visible) return null;

  return (
    <Notification {...props} onClose={onClose} className='fixed bottom-3 left-3'>
      <p className="text-[#389B48] text-base mr-8">{text}</p>
      <div className="w-full absolute h-1 left-0 bottom-0">
        <span className="block origin-left h-full bg-lime-500 animate-[progress_7s_ease]" onAnimationEnd={() => {
          onClose()
        }}></span>
      </div>
    </Notification>
  );
};