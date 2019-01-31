export default function formatTime(hour) {
    if(hour == 0 || hour == 24) {
        return '12 AM';
    }

    if(hour == 12) {
        return '12 PM';
    }

    if(hour > 12) {
        return `${hour - 12} PM`;
    }
    else {
        return `${hour} AM`;
    }
}