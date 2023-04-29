export default function RequiresLoginMessage({ title }) {
    return (
        <main>
            <header>
                <h1>{title}</h1>
            </header>
            <section>
                <h3>You must be logged in to view this page.</h3>
            </section>
        </main>
    );
}
