const gradesToPercent = {
    "A+": 100,
    "A": 89.5,
    "A-": 82,
    "B+": 77,
    "B": 69.5,
    "B-": 62,
    "C+": 57,
    "C": 49.5,
    "C-": 42,
    "D+": 37,
    "D": 29.5,
    "D-": 22,
    "F+": 17,
    "F": 9.5,
    "NC": 0,
}

class Course {
    constructor(name) {
        this.name = name;
        this.categories = [];
    }

    getName() {
        return this.name;
    }
    getCategories() {
        return this.categories;
    }

    setName(name){
        this.name = name;
    }
    addCat(category){
        this.categories.push(category);
    }

}
class Category {
    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
        this.assignments = [];
        this.percentage = 0;
    }
    
    getName() {
        return this.name;
    }
    getWeight() {
        return this.weight;
    }
    getAssignments() {
        return this.assignments;
    }
    getPercentage() {
        return this.percentage;
    }

    setName(name){
        this.name = name;
    }
    setWeight(weight){
        this.weight = weight;
    }
    addAss(assignment){
        this.assignments.push(assignment);
    }
    setPercentage(percentage) {
        this.percentage = percentage;
    }
}
class Assignment {
    constructor(name, grade, points) {
        this.name = name;
        this.grade = grade;
        this.points = points;
    }

    getName() {
        return this.name;
    }
    getGrade() {
        return this.grade;
    }
    getPoints() {
        return this.points;
    }

    setName(name){
        this.name = name;
    }
    setGrade(grade){
        this.grade = grade;
    }
    setPoints(points){
        this.points = points;
    }
}

function data(course) {
    const numCats = parseInt(document.getElementById("num-categories").value);
    
    for (let i = 0; i < numCats; i++) {
        let catName = prompt("Category name");
        let catWeight = prompt("Category Weight?");
        let category = new Category(catName, catWeight);
        let assignments = parseInt(prompt("How many assignments are in this category"));
    
        for (let j = 0; j < assignments; j++) {
            let assignmentName = prompt("Assignment name");
            let grade = prompt("Grade");
            let points = parseInt(prompt("Possible Points"));
            let assignment = new Assignment(assignmentName, grade, points);
            category.addAss(assignment);
        }
        course.addCat(category);
    }
    console.log(course);
    return course;
}
function calculate(course) {
    let IC = 0;
    let scaled = 0;
	let sum = 0;
    let earned = 0;
    let percentage = 0;
    
    course.categories.forEach(cat => {   
        cat.assignments.forEach(assignment => {
            sum += assignment.getPoints();
            earned += assignment.getPoints() * ((gradesToPercent[assignment.getGrade()]) * .01);
        });
        percentage = earned/sum;
        cat.setPercentage(percentage);
        IC += (cat.getPercentage() * cat.getWeight());
        sum = 0;
        earned = 0;
    });

    IC /= 80;
    scaled = (1 - IC)/2 + IC;
    return scaled;
}

function main() {
    const className = document.getElementById("class-name");
    let course = new Course(className);
    
    return calculate(data(course));
}
console.log(main());
