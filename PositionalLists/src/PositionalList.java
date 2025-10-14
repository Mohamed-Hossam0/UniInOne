public interface PositionalList<E> {
    int size();
    boolean isEmpty();
    Position<E> first();
    Position<E> last();
    Position<E> after(Position<E> p) throws IllegalStateException;
    Position<E> before(Position<E> p) throws IllegalStateException;
    Position<E> addFirst(E element);
    Position<E> addLast(E element);
    Position<E> addBefore(Position<E> p , E element) throws IllegalStateException;
    Position<E> addAfter(Position<E> p, E element)throws IllegalStateException;
    E set(Position<E> p,E element) throws IllegalStateException;
    E remove(Position<E> p) throws IllegalStateException;
}
