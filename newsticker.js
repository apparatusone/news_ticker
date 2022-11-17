const api_key = ''

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        --width-ticker: 300px;
        --height-ticker: 35px;
        --font-size-ticker: 20px;
        --speed-ticker: 5s;
        --offset-ticker: 300px;
    }
    a {
        all: unset;
        cursor: pointer
    }
    #ticker {
        display: flex;
        position: relative;
        font-family: 'IBM Plex Mono', monospace;
        width: var(--width-ticker);
        height: var(--height-ticker);
        font-size: var(--font-size-ticker);
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre;
        transition: all 220ms ease-in-out;
        border: 1px solid black;
        //  border-radius: 5px;
    }

    #ticker:hover > .class-id { 
        animation-play-state: paused
    }

    .class-id {
        position: absolute; 
        animation: test var(--speed-ticker) linear 0s infinite;
    }

    @keyframes test {
        0% {
            transform: translate(0,0);
        }
        100% {
            transform: translate(calc(-1 * var(--offset-ticker)),0);
        }
    }

</style>
<div id="ticker">
    <div class="class-id main"></div>
    <a href="" class="class-id secondary" style="left: var(--offset-ticker);"></a>
</div>`;

class NewsTicker extends HTMLElement {
    _fontSize = 20;
    _speed = 1;

    constructor () {
        super();

        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.container = this.shadowRoot.querySelector('#ticker')
        this.main = this.shadowRoot.querySelector('.main')
        this.secondary = this.shadowRoot.querySelector('.secondary')

        //load custom fonts
        const ibm = document.createElement("link");
        ibm.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap";
        ibm.rel = "stylesheet"
        document.head.appendChild(ibm);
    }

    connectedCallback() {
        this.shadowRoot.host.style.setProperty('--width-ticker', this.getAttribute('width') || "300px")
        this.shadowRoot.host.style.setProperty('--height-ticker', this.getAttribute('height') || "35px")
        this.shadowRoot.host.style.setProperty('--font-size-ticker', this.getAttribute('font-size') || "20px")
        this._fontSize = parseInt(this.shadowRoot.host.style.getPropertyValue('--font-size-ticker'))
        this._speed = parseInt(this.getAttribute('speed'))

        if (this.getAttribute('capitalize') === 'true') this.container.style.textTransform = "uppercase";
        this.render();
    }

    render(){}

    get textLength() {
        const width = this.main.getBoundingClientRect().width
        return width;
    }

    //theme ( theme ) {
        // billboard
        // future
    //}

    offset () {
        this.shadowRoot.host.style.setProperty('--offset-ticker', `${this.textLength}px`)
    }

    speed () {
       this.shadowRoot.host.style.setProperty(`--speed-ticker`, `${this.textLength / 29 / this._speed }s`);
    }

    update () {
        getNews().then(data => {
            const spacer = '   •   '
            for (let i = 0; i < data.results.length; i++) {

                const link = document.createElement("a");
                link.setAttribute('href', data.results[i].link);
                link.textContent = data.results[i].title + spacer
                this.main.append(link)

        
                const link2 = document.createElement("a");
                link2.setAttribute('href', data.results[i].link);
                link2.textContent += data.results[i].title + spacer
                this.secondary.append(link2)
            }

            this.speed();
            this.offset();
        }).catch(e => {
            console.error('Failed to retrieve news');
        });
    }
}



let response;
async function getNews() {
    const Url = `https://newsdata.io/api/1/news?apikey=${api_key}&country=us,pl&language=en&category=top,world,technology,politics`
    response = await fetch(Url);
    if (!response.ok) return
    console.log('success')
    const data = await response.json();
    return data
}

window.customElements.define('news-ticker', NewsTicker);
let a = document.getElementById("ticker")
a.update();



