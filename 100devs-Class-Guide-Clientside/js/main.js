const button = document.querySelector('button')
button.addEventListener('click', lessonSearch)

async function lessonSearch(){
    const week = document.querySelector('select').value


    if(week){
        
        document.querySelector('.lesson').classList.remove('hidden')
        document.querySelector('.menu').style.width = '35%'
        document.querySelector('.codeBtn').style.width = '48%'
        document.querySelector('select').style.width = '48%'
        document.querySelector('h1').style.fontSize = '2.25rem'
        
    }
    const watchSection = document.querySelector('#watchSection')
    const readSection = document.querySelector('#readSection')
    const doSection = document.querySelector('#doSection')
    const slidesSection = document.querySelector('#slidesSection')
    try{
        const response = await fetch(`https://onehundreddevs-class-guide.herokuapp.com/api/${week}`)
        const data = await response.json()

        //add week header
        document.querySelector('#weekHeader').innerText = data['name']

        // add tagline 
        document.querySelector('#tagline').innerText = data.tagline
        document.querySelector('#tagline').classList.add('paddingT')

        // input links for classes and slides
        document.querySelector('#class01').href = data['class_01']
        document.querySelector('#class02').href = data['class_02']

        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        // update watch section
        if(data.watch){
            removeAllChildNodes(watchSection)
            
            document.querySelector('#watchHeader').innerText = 'Watch:'
            
            let arr = Object.values(data.watch)
                        
            arr.forEach(video => {
                const anchorTag = document.createElement('a')
                anchorTag.setAttribute('href', video.link)
                anchorTag.setAttribute('target', '_blank')
                anchorTag.innerText = video.title
                watchSection.appendChild(anchorTag).classList.add('paddingT')
            })
        }
        if(data.readings){
            removeAllChildNodes(readSection)
            
            document.querySelector('#readHeader').innerText = 'Read:'
            
            let arr = Object.values(data.readings)
            
            arr.forEach(text => {
                const anchorTag = document.createElement('a')
                anchorTag.setAttribute('href', text.link)
                anchorTag.setAttribute('target', '_blank')
                anchorTag.innerText = text.title
                readSection.appendChild(anchorTag).classList.add('paddingT')
            }) 
        }
        if(data.do){
            removeAllChildNodes(doSection)

            document.querySelector('#doHeader').innerText = 'Do:'

            for(let key in data.do){
                const anchorTag = document.createElement('a')
                anchorTag.setAttribute('href', data.do[key])
                anchorTag.setAttribute('target', '_blank')
                anchorTag.innerText = `${data.do[key]}`

            }
        }
        if(data.slides_01){
            removeAllChildNodes(slidesSection)
            document.querySelector('#slidesHeader').innerText = 'Slides:'
            const anchorTag = document.createElement('a')
            anchorTag.setAttribute('href', data.slides_01)
            anchorTag.setAttribute('target', '_blank')
            anchorTag.innerText = `Slides for Class 01`
            slidesSection.appendChild(anchorTag).classList.add('paddingT')
            
        }
        if(data.slides_02){
            const anchorTag = document.createElement('a')
            anchorTag.setAttribute('href', data.slides_02)
            anchorTag.setAttribute('target', '_blank')
            anchorTag.innerText = `Slides for Class 02`
            slidesSection.appendChild(anchorTag).classList.add('paddingT')
        }



    }catch(err){
        console.log(err)
    }
}