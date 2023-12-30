import clsx from 'clsx';

/*
** Container component. This acts as a wrapper, and has a container class assigned to it.
** The container class has a set max-width to be in line with modern web design standards.
*/
export default function Container(props) {
    const { children, variant } = props;

    const classes = clsx({
        'container': true
    }, variant);

    return (
        <>
            <div className={classes}>
                {children}
            </div>
        </>
    )
}