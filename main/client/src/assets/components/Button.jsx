import clsx from 'clsx';

/*
** Button component. Each button component has a 'btn' class assigned to it by default.
** The variant prop decides what other class the button receives, through the help of
** the clsx module. The rest of the props the button might have are then spread into the
** element with the ...rest operator. This can be dataset key-pair values, function clicks.
*/
export default function Button(props) {
    const { children, variant, ...rest } = props;

    const classes = clsx({
        'btn': true
    }, variant)

    return (
        <button className={classes} {...rest}>{children}</button>
    )
}