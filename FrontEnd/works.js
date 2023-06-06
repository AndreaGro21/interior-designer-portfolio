function Works() {
    let savedWorks;
    return {
        setWorks(works) {
            savedWorks = works
        },
        getWorks() {
            return savedWorks
        }
    }
}

export const savedWorks = Works()
