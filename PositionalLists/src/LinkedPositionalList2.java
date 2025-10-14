
public class LinkedPositionalList2<E> {
    private static class Node<E> implements Position<E>{
        private E element;
        private Node<E> prev;
        private Node<E> next;

        public Node(E element,Node<E> p,Node<E> n){
            this.element=element;
            prev=p;
            next=n;
        }
        public E getElement() throws IllegalStateException {
            if(next==null)//في حالة لو هو trailer
                throw new IllegalStateException("Position is no longer valid");
            return element;
        }

        public void setElement(E element) {
            this.element = element;
        }

        public void setPrev(Node<E> prev) {
            this.prev = prev;
        }

        public Node<E> getPrev() {
            return prev;
        }

        public Node<E> getNext() {
            return next;
        }

        public void setNext(Node<E> next) {
            this.next = next;
        }
    }
    private Node<E> header;
    private Node<E> trailer;
    private int size=0;
    public LinkedPositionalList2(){
        header=new Node<>(null,null,null);
        trailer=new Node<>(null,header,null);
        header.next=trailer;
    }
    private Node<E> validate(Position<E> p){
        if(!(p instanceof Node))
            throw new IllegalStateException("invalid position");
        Node<E> node = (Node<E>) p; //safe cast
        if(node.getNext()==null)
            throw new IllegalStateException("p is no longer in the list");
        return node;
    }
    private Position<E> position(Node<E> node){
        if (node==header || node == trailer)
            return null;
        return node;
    }
    public int size(){
        return size;
    }
    public boolean isEmpty() {
        return size==0;
    }
    public Position<E> first(){
        return position(header.getNext());
    }
    public Position<E> last(){
        return position(trailer.getPrev());
    }
    public Position<E> after(Position<E> p){
        Node<E> node= validate(p);
        return position(node.getNext());
    }
    public Position<E> before(Position<E> p){
        Node<E> node = validate(p);
        return position(node.getPrev());
    }
    private Position<E> addBetween(E element, Node<E> pred, Node<E> succ){
        Node<E> newest= new Node<>(element,null,null);
        newest.prev=pred;
        newest.next=succ;
        pred.next=newest;
        succ.prev=newest;
        size++;
        return newest;
    }
    public Position<E> addFirst(E element){
        return addBetween(element,header,header.next);
    }
    public Position<E> addLast(E element){
        return addBetween(element,trailer.getPrev(),trailer);
    }
    public Position<E> addAfter(Position<E> p , E element) throws IllegalStateException{
        Node<E> node=validate(p);
        return addBetween(element,node,node.getNext());
    }
    public Position<E> addBefore(Position<E> p , E element){
        Node<E> node = validate(p);
        return addBetween(element,node.getPrev(),node);
    }
    public E set(Position<E> p ,E element){
        Node<E> node = validate(p);
        E answer = node.getElement();
        node.setElement(element);
        return answer;
    }
    public E remove(Position<E> p){
        Node<E> node = validate(p);
        Node<E> pred = node.getPrev();
        Node<E> succ=node.getNext();
        pred.setNext(succ);
        succ.setPrev(pred);
        size--;
        E answer = node.getElement();
        node.setElement(null);
        node.setPrev(null);
        node.setNext(null);
        return answer;
    }
    //7.11
    public Position<E> addLast1(E element){
        return addAfter(last(),element);
    }
    public Position<E> addBefore1(Position<E> p , E element){
        //case 1 --> node1<-->node2<-->nodeX<-->node3
        //case 2 --> node1<-->node2<-->nodeX<-->node3
        Node<E> node = validate(p);
        if (before(p)==null){
            return addFirst(element);
        }
        return addAfter(before(p),element);
    }
    //7.12
    public int indexOf(Position<E> p){
        validate(p);

        Position<E> cursor = first();
        int index=0;
        while (cursor!=null){
            if(cursor.getElement()==p.getElement()){
                return index;
            }
            index++;
            cursor=after(cursor);
        }
        return -1;
    }
    //7.13
    public Position<E> findPosition(E element){
        //[1,2,3,2,34,2,34]
        Position<E> cursor = first();
        while (cursor!=null){
            if (cursor.getElement()==element){
                return cursor;
            }
            cursor=after(cursor);
        }
        return null;
    }
    //7.36
    public Position<E> positionAtIndex(int i){

        Position<E> cursor = first();//ListNode p = head;
        int k=0;
        while (cursor!=null){
            if (k==i){
                return cursor;
            }
            k++;
            cursor=after(cursor);
        }
        throw new IndexOutOfBoundsException();
    }
    //7.39
    public void moveToFront(Position<E> p){
        validate(p);
        E ans =remove(p);
        addFirst(ans);
    }
    //7.42
    public LinkedPositionalList2<E> reverse(){
       Position<E> cursor = first();//-----> last();
       LinkedPositionalList2<E> reverse = new LinkedPositionalList2<>();
       while (cursor!=null){
           reverse.addFirst(cursor.getElement());//[3,2,1]
           cursor=after(cursor);
       }
        return reverse;
    }

}
