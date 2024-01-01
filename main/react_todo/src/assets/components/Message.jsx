import clsx from 'clsx';
import { useMessage } from "../context/MessageContext";

export default function Message() {
    const { message } = useMessage();

    let classes;
    if (message) {
        classes = clsx({
            'm-y-half': true,
            'text-center': true,
            'message': true,
            'message-success': message.success,
            'message-failure': !message.success
        });
    };

    return (
        <>
            {message && <p className={classes}>{message.message}</p>}
        </>
    )
}