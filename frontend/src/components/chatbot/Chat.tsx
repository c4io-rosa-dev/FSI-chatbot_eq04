


export default function Chat() {
    return (
        <div className="w-full flex flex-col justify-end p-4 h-full">
            <form
                id="form-chatbot"
                className="w-full flex justify-center gap-4 bg-red-500 mb-6"
            >
                <input
                    type="text"
                    placeholder="Digite uma mensagem"
                    className="flex-1"
                />
                <button
                    type="submit"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}