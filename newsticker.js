const api_key = 'api_key'

class NewsTicker {
    #init;
    _width = 300;
    _height = 35;
    _fontSize = 20;
    _speed = 1;

    /**
     * 
     * @param {string} id - id of the new ticker
     * @param {string} parent - optional: id of parent element
     */
    constructor (id, parent = 'body') {
        this.id = id;
        this.parent = parent;
        this.text = 'The US Navy now knows why the water on an aircraft…ked and smelled strange. Microsoft starts rolling out Android 12L for the Surface Duo and Duo 2'

        this.stylesheet;
        this.container;
        this.rulePosition;

        this.main;
        this.secondary;

        this.#init = function() {
            this.textLength
            this.initVariables();
            this.initContainer(id,parent);
            this.initClass(id);
            this.update();
        }.call(this);
    }

    get textLength() {
        let span = document.createElement("span");
        span.innerText = this.text;
        span.style.whiteSpace = 'nowrap';
        span.style.fontSize = `${this._fontSize}px`
        span.style.whiteSpace = 'pre';
        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width
        document.body.removeChild(span);
        return width;
    }

    theme ( theme ) {

    }

    width (w = this._width) {
        this._width = w;
        document.querySelector(':root').style.setProperty(`--width-${this.id}`, `${w}px`);
    }

    height (h = this._height) {
        this._height = h;
        document.querySelector(':root').style.setProperty(`--height-${this.id}`, `${h}px`);
    }

    offset () {
        document.querySelector(':root').style.setProperty(`--offset-${this.id}`, `${this.textLength}px`);
    }

    fontSize (fs = this._fontSize) {
        this._fontSize = fs;
        document.querySelector(':root').style.setProperty(`--font-size-${this.id}`, `${fs}px`);
        this.offset();
        this.speed();
    }

    speed (s = this._speed) {
        this._speed = s;
        document.querySelector(':root').style.setProperty(`--speed-${this.id}`, `${this.textLength / 29 / s / (this._fontSize/20)}s`);
    }

    dimension = {
        width: 300,
        height: 50,
        borderRadius: 1,
        backgroundColor: 'white',
        fontColor: 'black',
        fontSize: 40,
        border: true,
        borderColor: 'black',
        speed: 1,
    }

    initContainer (id,parent) {
        this.container = document.createElement('div');
        this.container.setAttribute('id',id);
        if (parent === 'body') document.body.append(this.container);
        if (parent !== 'body') document.getElementById(parent).append(this.container)

        this.container.style.position = 'relative';
        this.container.style.width = `var(--width-${this.id})`;
        this.container.style.height = `var(--height-${this.id})`;
        this.container.style.fontSize = `var(--font-size-${this.id})`
        this.container.style.padding = '0';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center'
        this.container.style.overflow = 'hidden';
        this.container.style.textOverflow = 'ellipsis';
        this.container.style.whiteSpace = 'pre';
        this.container.style.transition = 'all 220ms ease-in-out';
        this.container.style.border = '2px solid black';
        this.container.style.borderRadius = '5px'
    }

    initClass (id) {
        this.main = document.createElement('div');
        this.secondary = document.createElement('div');

        const rules = ` position: absolute; animation: test var(--speed-${this.id}) linear 0s infinite; `
        //const rules = ` position: absolute; animation: test 9s linear 0s infinite; `

        const pos = this.stylesheet.sheet.cssRules.length;
        this.stylesheet.sheet.insertRule(`.class-${id}` + "{" + rules + "}", pos);
        this.stylesheet.sheet.insertRule(`#${id}:hover > .class-${id}` + "{" + "animation-play-state: paused;" + "}", pos+1);
        this.stylesheet.sheet.insertRule('a' + "{" + "all: unset; cursor: pointer" + "}", pos+2);

        this.main .classList.add(`class-${id}`)

        this.secondary.classList.add(`class-${id}`)
        this.secondary.style.left = `var(--offset-${this.id})`

        this.container.append(this.main )
        this.container.append(this.secondary)
    }

    /**
     * 
     * @param {string} style - name of existing stylesheet
     */
    initVariables (id, style = 'style') {
        //get existing stylesheet
        this.stylesheet = document.querySelector('link[href*=' + style + ']')

        // create stylesheet if none exists
        if (this.stylesheet == null) { 
            this.stylesheet = document.createElement('style');
            document.head.appendChild( this.stylesheet );
        }

        this.offset();
        this.rulePosition = this.stylesheet.sheet.cssRules.length
        const str = '0%{transform: translate(0,0)}' + `100%{transform: translate(calc(-1 * var(--offset-${this.id})),0);}`
        this.stylesheet.sheet.insertRule("@keyframes " + "test" + "{" + str + "}", this.rulePosition);

        this.width();
        this.height();
        this.fontSize();
        this.speed()
    }

    update () {
        getNews().then(data => {
            this.text = ''
            const spacer = '    •    '
            for (let i = 0; i < data.results.length; i++) {
                this.text = this.text.concat(' ', data.results[i].title + spacer)

                const link = document.createElement("a");
                link.setAttribute('href', data.results[i].link);
                link.textContent = data.results[i].title;
                if (i !== data.results.length - 1) link.textContent = link.textContent.concat(spacer)
                this.main.append(link)
        
                const link2 = document.createElement("a");
                link2.setAttribute('href', data.results[i].link);
                link2.textContent = data.results[i].title + spacer;
                if (i !== data.results.length - 1) link2.textContent = link2.textContent.concat(spacer)
                this.secondary.append(link2)
            }

            this.width();
            this.height();
            this.fontSize();
            this.speed()
        }).catch(e => {
            console.error('Failed to retrieve news');
        });
    }
}

//let ticker = new NewsTicker( 'ticker3' )
ticker.width ( 450 )
ticker.height ( 30 )
//ticker.fontSize (20)
ticker.speed (2.5)

let response;
let news = ""
async function getNews() {
    const Url = `https://newsdata.io/api/1/news?apikey=${api_key}&country=us`
    response = await fetch(Url);
    if (!response.ok) return
    console.log('success')
    const data = await response.json();
    return data
}








