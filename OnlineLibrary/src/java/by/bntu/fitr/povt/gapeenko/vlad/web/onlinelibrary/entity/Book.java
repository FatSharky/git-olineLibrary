package by.bntu.fitr.povt.gapeenko.vlad.web.onlinelibrary.entity;
// Generated Dec 14, 2015 12:12:28 AM by Hibernate Tools 4.3.1

/**
 * Book generated by hbm2java
 */
public class Book implements java.io.Serializable {

    private boolean imageEdited;
    private boolean contentEdited;
    private boolean edit;
    private Long id;
    private Author author;
    private Genre genre;
    private Publisher publisher;
    private String name;
    private byte[] content;
    private int pageCount;
    private String isbn;
    private int publishYear;
    private byte[] image;
    private String descr;

    public Book() {
    }

    public Book(Author author, Genre genre, Publisher publisher, String name, int pageCount, String isbn, int publishYear) {
        this.author = author;
        this.genre = genre;
        this.publisher = publisher;
        this.name = name;
        this.pageCount = pageCount;
        this.isbn = isbn;
        this.publishYear = publishYear;
    }

    public Book(Author author, Genre genre, Publisher publisher, String name, byte[] content, int pageCount, String isbn, int publishYear, byte[] image, String descr) {
        this.author = author;
        this.genre = genre;
        this.publisher = publisher;
        this.name = name;
        this.content = content;
        this.pageCount = pageCount;
        this.isbn = isbn;
        this.publishYear = publishYear;
        this.image = image;
        this.descr = descr;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Author getAuthor() {
        return this.author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Genre getGenre() {
        return this.genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Publisher getPublisher() {
        return this.publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getContent() {
        return this.content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public int getPageCount() {
        return this.pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public String getIsbn() {
        return this.isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getPublishYear() {
        return this.publishYear;
    }

    public void setPublishYear(int publishYear) {
        this.publishYear = publishYear;
    }

    public byte[] getImage() {
        return this.image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getDescr() {
        return this.descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    /**
     * @return the edit
     */
    public boolean isEdit() {
        return edit;
    }

    /**
     * @param edit the edit to set
     */
    public void setEdit(boolean edit) {
        this.edit = edit;
    }

    /**
     * @return the imageEdited
     */
    public boolean isImageEdited() {
        return imageEdited;
    }

    /**
     * @param imageEdited the imageEdited to set
     */
    public void setImageEdited(boolean imageEdited) {
        this.imageEdited = imageEdited;
    }

    /**
     * @return the contentEdited
     */
    public boolean isContentEdited() {
        return contentEdited;
    }

    /**
     * @param contentEdited the contentEdited to set
     */
    public void setContentEdited(boolean contentEdited) {
        this.contentEdited = contentEdited;
    }

}
