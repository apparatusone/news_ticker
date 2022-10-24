class NewsTicker {
    #init;
    /**
     * 
     * @param {string} id - id of the new ticker
     * @param {string} parent - optional: id of parent element
     */
    constructor (id, parent = 'body') {
        this.id = id;
        this.parent = parent;
        this.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum........'

        this.stylesheet;
        this.container;

        this.#init = function() {
            this.textLength
            this.initContainer (id,parent)
            this.initKeyframe()
            this.initClass(id)
            this.update(this.element)
        }.call(this);
    }

    get textLength() {
        let span = document.createElement("span");
        span.innerText = this.text;
        span.style.whiteSpace = 'nowrap';
        span.style.fontSize = '35px'
        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width
        document.body.removeChild(span);
        return width;
    }

    theme ( theme ) {

    }

    width (w) {
        this.dimension.width = w;
        //this.update(this.element);
    }

    height (h) {
        dimension.height = h;
    }

    fontSize (fs) {
        dimension.height = fs;
    }

    speed (s) {
        dimension.height = s;
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
        this.container.style.width = '600px';
        this.container.style.height = '35px';
        this.container.style.fontSize = '35px';
        this.container.style.padding = '0';
        //this.container.style.lineHeight = '100%';
        this.container.style.display = 'flex';
        this.container.style.alignItems = 'center'
        this.container.style.overflow = 'hidden';
        this.container.style.textOverflow = 'ellipsis';
        this.container.style.whiteSpace = 'nowrap';
        this.container.style.transition = 'all 220ms ease-in-out';
        this.container.style.border = '2px solid black';
        this.container.style.borderRadius = '5px'
    }

    initClass (id) {
        const leftMarquee = document.createElement('div');
        const rightMarquee = document.createElement('div');

        const rules = ` position: absolute; animation: test ${this.textLength / 29 }s linear 0s infinite; `

        const pos = this.stylesheet.sheet.cssRules.length;
        this.stylesheet.sheet.insertRule(".cssClass" + "{" + rules + "}", pos);
        this.stylesheet.sheet.insertRule(`#${id}:hover > .cssClass` + "{" + "animation-play-state: paused;" + "}", pos+1);

        leftMarquee.textContent = this.text
        leftMarquee.classList.add('cssClass')

        rightMarquee.textContent = this.text
        rightMarquee.classList.add('cssClass')
        rightMarquee.style.left = `${this.textLength + 50}px`

        this.container.append(leftMarquee)
        this.container.append(rightMarquee)
    }

    /**
     * 
     * @param {string} style - name of existing stylesheet
     */
    initKeyframe (style = 'style') {
        //get existing stylesheet
        this.stylesheet = document.querySelector('link[href*=' + style + ']')
        
        // create stylesheet if none exists
        if (this.stylesheet == null) { 
            //stylesheet = document.createElement('style'), addKeyFrames = null;
            this.stylesheet = document.createElement('style');
            document.head.appendChild( this.stylesheet );
        }

        let str = '0%{transform: translate(0,0)}' + `100%{transform: translate(-${this.textLength + 50}px,0);}`

        var pos = this.stylesheet.length;
        this.stylesheet.sheet.insertRule("@keyframes " + "test" + "{" + str + "}", pos);
    }

    initVariables (id) {
        const pos = this.stylesheet.sheet.cssRules.length;
        let rules = `--width-${id}: 400px;`
        this.stylesheet.sheet.insertRule(":root" + "{" + rules + "}", pos);
    }

    // update = (element) => {
    //     let { width, height, fontSize } = this.dimension;
    //     element.textContent = this.text;

    //     element.style.width = `${width}px`;
    //     element.style.height = `${height}px`;
    //     element.style.fontSize = `${fontSize}px`;
    //     element.style.border = "1px solid black";

    //     element.style.animation = ("test 8s linear 0s infinite")
    // }
}

let ticker = new NewsTicker( 'ticker3' )
ticker.width ( 300 )


//let ticker2 = new NewsTicker( 'ticker5' )





